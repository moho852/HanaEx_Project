package hanaback.hanabackuser.repository;

import hanaback.hanabackuser.dto.AccountsDetDto;
import hanaback.hanabackuser.dto.AccountsTrDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AccountDetTableRepository {

    private final JdbcTemplate jdbcTemplate;
    private final SqlSession sqlSession;

    @Autowired
    public AccountDetTableRepository(JdbcTemplate jdbcTemplate, SqlSession sqlSession) {
        this.jdbcTemplate = jdbcTemplate;
        this.sqlSession = sqlSession;
    }

    // accounts_det 업데이트 메서드
    public void updateAccountsDet(AccountsTrDto accountsTrDto) {
        String fromAccount = accountsTrDto.getFrom_account_number();
        String toAccount = accountsTrDto.getTo_account_number();
        String currencyColumn = accountsTrDto.getCurrency_code().toLowerCase();
        double withdrawalAmount = accountsTrDto.getWithdrawal_amount();
        double depositAmount = accountsTrDto.getDeposit_amount();

        if ("completed".equals(accountsTrDto.getConclusion_status())) {
            // 1. from_account가 "하나저축예금"일 경우
            if ("하나저축예금".equals(fromAccount)) {
                // 하나저축예금 계좌에서 KRW 차감
                String updateFromSql = "UPDATE accounts_det SET krw = krw - ? WHERE accounts_name = '하나저축예금'";
                jdbcTemplate.update(updateFromSql, withdrawalAmount);

                // 하나밀리언달러통장에 해당 통화 추가
                String updateToSql = String.format("UPDATE accounts_det SET %s = %s + ? WHERE accounts_name = '하나밀리언달러통장'", currencyColumn, currencyColumn);
                jdbcTemplate.update(updateToSql, depositAmount);

                // 2. from_account가 "하나밀리언달러통장"일 경우
            } else if ("하나밀리언달러통장".equals(fromAccount)) {
                // 하나밀리언달러통장에서 해당 통화 차감
                String updateFromSql = String.format("UPDATE accounts_det SET %s = %s - ? WHERE accounts_name = '하나밀리언달러통장'", currencyColumn, currencyColumn);
                jdbcTemplate.update(updateFromSql, withdrawalAmount);

                // 하나저축예금 계좌에 KRW 추가
                String updateToSql = "UPDATE accounts_det SET krw = krw + ? WHERE accounts_name = '하나저축예금'";
                jdbcTemplate.update(updateToSql, depositAmount);
            }
        }
    }
    // 모든 계좌 정보 조회
    public List<AccountsDetDto> findAllAccounts() {
        return sqlSession.selectList("hanaback.hanabackuser.repository.AccountDetTableRepository.findAllAccounts");
    }
}
