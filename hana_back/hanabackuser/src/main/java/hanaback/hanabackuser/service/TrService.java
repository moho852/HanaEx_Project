package hanaback.hanabackuser.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import hanaback.hanabackuser.dto.AccountsDetDto;
import hanaback.hanabackuser.dto.AccountsTrDto;
import hanaback.hanabackuser.dto.TodayDataDto;
import hanaback.hanabackuser.repository.AccountDetTableRepository;
import hanaback.hanabackuser.repository.AccountTrTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrService {

    @Autowired
//    private AccountTrTableRepository accountTrTableRepository;
    private final AccountTrTableRepository accountTrTableRepository;
    private final AccountDetTableRepository accountDetTableRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    private static final String MAINPAGE_DETAIL_URL = "http://localhost:8081/api/mainpage/detail?state=USD";

    @Transactional
    public void processReservedTransactions(String state) {
        // hanaback의 /mainpage/detail 엔드포인트 호출
        String response = restTemplate.getForObject(MAINPAGE_DETAIL_URL, String.class, state);

        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode todayDataNode = root.path("todayData");
            List<TodayDataDto> todayDataList = objectMapper.convertValue(
                    todayDataNode,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, TodayDataDto.class)
            );

            if (todayDataList.isEmpty()) {
                System.out.println("오늘 데이터가 없습니다.");
                return;
            }

            // currency_code가 "USD"인 todayData 중 period가 가장 높은 값 선택
            TodayDataDto selectedTodayData = todayDataList.stream()
                    .filter(td -> "USD".equalsIgnoreCase(td.getState()))
                    .max((td1, td2) -> Integer.compare(td1.getPeriod(), td2.getPeriod()))
                    .orElse(null);

            if (selectedTodayData == null) {
                System.out.println("currency_code가 'USD'인 오늘 데이터가 없습니다.");
                return;
            }

            double targetRemitSend = selectedTodayData.getRemitSend();
            double targetRemitReceive = selectedTodayData.getRemitReceive();

            // ACCOUNTS_TR에서 CONCLUSION_STATUS가 'reserved'인 거래 조회
            List<AccountsTrDto> reservedTransactions = accountTrTableRepository.getReservedTransactions();

            for (AccountsTrDto transaction : reservedTransactions) {
                String transactionType = transaction.getTransaction_type();
                double requestAmount = transaction.getRequest_amount();
                String currencyCode = transaction.getCurrency_code();
                boolean matched = false;

                // 거래 타입에 따라 비교
                if ("buy".equalsIgnoreCase(transactionType)) {
                    if (Double.compare(requestAmount, targetRemitSend) == 0) {
                        matched = true;
                    }
                } else if ("sell".equalsIgnoreCase(transactionType)) {
                    if (Double.compare(requestAmount, targetRemitReceive) == 0) {
                        matched = true;
                    }
                }

                if (matched) {
                    // CONCLUSION_STATUS를 'completed'로 변경
                    transaction.setConclusion_status("completed");
                    accountTrTableRepository.updateTransaction(transaction);

                    // account_det 업데이트
                    String fromAccountNumber = transaction.getFrom_account_number();
                    AccountsDetDto accountDet = accountDetTableRepository.findAllAccounts().stream()
                            .filter(ad -> ad.getAccounts_name().equals(fromAccountNumber))
                            .findFirst()
                            .orElse(null);

                    if (accountDet == null) {
                        System.err.println("Account details not found for accountsName: " + fromAccountNumber);
                        continue;
                    }

                    if ("buy".equalsIgnoreCase(transactionType)) {
                        // KRW에서 WITHDRAWAL_AMOUNT 차감
                        double newKrw = accountDet.getKrw() - transaction.getWithdrawal_amount();
                        accountDet.setKrw(newKrw);

                        // CURRENCY_CODE에 DEPOSIT_AMOUNT 추가
                        addCurrencyAmount(accountDet, currencyCode, transaction.getDeposit_amount());
                    } else if ("sell".equalsIgnoreCase(transactionType)) {
                        // KRW에서 DEPOSIT_AMOUNT 차감
                        double newKrw = accountDet.getKrw() - transaction.getDeposit_amount();
                        accountDet.setKrw(newKrw);

                        // CURRENCY_CODE에 WITHDRAWAL_AMOUNT 추가
                        addCurrencyAmount(accountDet, currencyCode, transaction.getWithdrawal_amount());
                    }

                    // account_det 테이블 업데이트
                    accountDetTableRepository.updateAccountsDet(transaction);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            // 트랜잭션 롤백
            throw new RuntimeException("Error processing reserved transactions", e);
        }
    }

    /**
     * 특정 통화에 금액을 추가하는 메서드
     * @param accountDet 업데이트할 계좌 정보
     * @param currencyCode 통화 코드 (예: "USD")
     * @param amount 추가할 금액
     */
    private void addCurrencyAmount(AccountsDetDto accountDet, String currencyCode, double amount) {
        switch (currencyCode.toUpperCase()) {
            case "USD":
                accountDet.setUsd(accountDet.getUsd() + amount);
                break;
            case "EUR":
                accountDet.setEur(accountDet.getEur() + amount);
                break;
            case "JPY":
                accountDet.setJpy(accountDet.getJpy() + amount);
                break;
            // 필요한 다른 통화도 추가하세요
            default:
                System.err.println("Unknown currency code: " + currencyCode);
                break;
        }
    }

    public void processTransaction(AccountsTrDto accountsTrDto) {
        // 추가적인 비즈니스 로직이 필요하면 여기에 작성
        accountTrTableRepository.insertTransaction(accountsTrDto);
    }

    // reserved 상태의 트랜잭션을 조회하는 서비스
    public List<AccountsTrDto> getReservedTransactions() {
        return accountTrTableRepository.getReservedTransactions();
    }

    // 트랜잭션 업데이트 서비스
    public void updateTransaction(AccountsTrDto accountsTrDto) {
        accountTrTableRepository.updateTransaction(accountsTrDto);
    }
}

