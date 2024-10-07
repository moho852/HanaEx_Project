package com.hanaback.hanaback.controller;


import com.hanaback.hanaback.dto.ExTableDto;
import com.hanaback.hanaback.dto.HrTableDto;
import com.hanaback.hanaback.dto.SemanticDto;
import com.hanaback.hanaback.dto.TExTableDto;
import com.hanaback.hanaback.repository.ExtableRepository;
import com.hanaback.hanaback.service.MainPageDetailService;
import com.hanaback.hanaback.service.MainPageService;
import com.hanaback.hanaback.service.NewsService;
import com.hanaback.hanaback.service.SentimentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MainPageController {
    private final MainPageService mainPageService;
    private final ExtableRepository extableRepository;
    private final MainPageDetailService mainPageDetailService;

    public MainPageController(MainPageService mainPageService, ExtableRepository extableRepository, MainPageDetailService mainPageDetailService) {
        this.mainPageService = mainPageService;
        this.extableRepository = extableRepository;
        this.mainPageDetailService = mainPageDetailService;
    }

    @GetMapping("/mainpage")
    public ResponseEntity<Map<String, Object>> getChartData () {
        List<ExTableDto> data = extableRepository.findAll(); // 데이터를 가져와서
        Map<String, Object> chartData = mainPageService.getChartData(data); // 주입
        return ResponseEntity.ok(chartData);
    }

    @GetMapping("/mainpage/worldtable")
    public ResponseEntity<Map<String, Object>> getWorldTableData() {
        Map<String, Object> worldTableData = mainPageService.getWorldTableData();
        return ResponseEntity.ok(worldTableData);
    }

    @GetMapping("/mainpage/detail")
    public ResponseEntity<Map<String, Object>>  getDetail(@RequestParam("state") String state) {
        List<HrTableDto> hrData = mainPageDetailService.getDetailByState();
        List<TExTableDto> todayData = mainPageDetailService.getTodayByState();
        // 변환 작업 수행
        List<Map<String, Object>> transformedData = new ArrayList<>();
        for (HrTableDto hr : hrData) {
            Map<String, Object> transformedEntry = new HashMap<>();
            transformedEntry.put("state", hr.getState());
            transformedEntry.put("day", hr.getDate());
            transformedEntry.put("price", List.of(hr.getHigh(), hr.getLow()));
            transformedEntry.put("baserate", hr.getClose());
            transformedData.add(transformedEntry);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("isSuccess", true);
        response.put("code", 200);
        response.put("message", "성공입니다.");
        response.put("data", transformedData);
        response.put("todayData", todayData);
        return ResponseEntity.ok(response);
    }
}
