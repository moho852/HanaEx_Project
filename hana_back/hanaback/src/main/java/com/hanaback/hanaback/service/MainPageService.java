package com.hanaback.hanaback.service;

import com.hanaback.hanaback.dto.ChartDataDto;
import com.hanaback.hanaback.dto.ChartEntryDto;
import com.hanaback.hanaback.dto.ExTableDto;
import com.hanaback.hanaback.dto.WExTableDto;
import com.hanaback.hanaback.repository.ExtableRepository;
import com.hanaback.hanaback.repository.WExTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MainPageService {
    private final ExtableRepository extableRepository;
    private final WExTableRepository wExTableRepository; // WExTableRepository 추가

    public List<ExTableDto> findAll() {
        return extableRepository.findAll();
    }

    public Map<String, Object> getChartData(List<ExTableDto> exTableDtoList) {
        int index = 1;
        // State별 최신 날짜 데이터 필터링
        Map<String, ExTableDto> latestDataMap = new HashMap<>();
        for (ExTableDto data : exTableDtoList) {
            String state = data.getState();
            if (!latestDataMap.containsKey(state) ||
                    LocalDate.parse(data.getDate()).isAfter(LocalDate.parse(latestDataMap.get(state).getDate()))) {
                latestDataMap.put(state, data);
            }
        }

        // chartData 생성
        List<ChartEntryDto> chartDataList = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

        for (String state : latestDataMap.keySet()) {
            ExTableDto latestData = latestDataMap.get(state);

            List<ExTableDto> stateData = new ArrayList<>();
            for (ExTableDto data : exTableDtoList) {
                if (data.getState().equals(state)) {
                    stateData.add(data);
                }
            }
            stateData.sort(Comparator.comparing(ExTableDto::getDate));

            // 7분기로 나누기
            int size = stateData.size();
            int partitionSize = size / 7;
            List<ChartDataDto> chartData = new ArrayList<>();

            char pageLabel = 'A';
            for (int i = 0; i < 7; i++) {
                int start = i * partitionSize;
                int end = (i == 6) ? size : (i + 1) * partitionSize; // 마지막 파티션은 남은 모든 데이터 포함
                double sum = 0;
                for (int j = start; j < end; j++) {
                    sum += stateData.get(j).getExchangeRate();
                }
                double avgRate = sum / (end - start);
                chartData.add(new ChartDataDto("Page " + pageLabel++, avgRate));
            }

            // 최종 데이터 추가
            ChartEntryDto chartEntry = new ChartEntryDto(
                    index,
                    state,
                    "/image/" + state.toLowerCase() + "_flag.png",
                    latestData.getExchangeRate(),
                    LocalDate.parse(latestData.getDate()).format(formatter),
                    latestData.getComparedToPrevious(),
                    chartData
            );
            index += 1;
            chartDataList.add(chartEntry);
        }

        // JSON 형태의 최종 응답 구조
        Map<String, Object> response = new HashMap<>();
        response.put("isSuccess", true);
        response.put("code", 200);
        response.put("message", "성공입니다.");
        response.put("data", chartDataList);

        return response;
    }

    // world_ex_table 데이터를 가져오는 메서드
    public Map<String, Object> getWorldTableData() {
        // WExTableRepository를 통해 데이터를 가져옴
        List<WExTableDto> w_data = wExTableRepository.findAll();
        List<ExTableDto> ex_data = extableRepository.findAll();

        // 데이터를 변환하여 응답 데이터로 가공
        List<Map<String, Object>> responseData = new ArrayList<>();
        for (WExTableDto entry : w_data) {
            Map<String, Object> entryMap = new HashMap<>();
            entryMap.put("myRowId", entry.getMyRowId());
            entryMap.put("currency", entry.getCurrency());
            entryMap.put("cashBuy", entry.getCashBuy());
            entryMap.put("cashBuySpread", entry.getCashBuySpread());
            entryMap.put("cashSell", entry.getCashSell());
            entryMap.put("cashSellSpread", entry.getCashSellSpread());
            entryMap.put("remitSend", entry.getRemitSend());
            entryMap.put("remitReceive", entry.getRemitReceive());
            entryMap.put("foreignCheckSell", entry.getForeignCheckSell());
            entryMap.put("baseRate", entry.getBaseRate());
            entryMap.put("exchangeCommission", entry.getExchangeCommission());
            entryMap.put("nonConvertibleRate", entry.getNonConvertibleRate());
            entryMap.put("referenceDate", entry.getReferenceDate());
            entryMap.put("announcementRound", entry.getAnnouncementRound());
            entryMap.put("announcementTime", entry.getAnnouncementTime());

            responseData.add(entryMap);
        }
        // JSON 형태의 최종 응답 구조
        Map<String, Object> response = new HashMap<>();
        response.put("isSuccess", true);
        response.put("code", 200);
        response.put("message", "성공입니다.");
        response.put("data", responseData);

        return response;
    }
}