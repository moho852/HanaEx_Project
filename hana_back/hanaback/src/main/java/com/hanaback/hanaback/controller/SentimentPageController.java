package com.hanaback.hanaback.controller;

import com.hanaback.hanaback.dto.SentimentDto;
import com.hanaback.hanaback.dto.WordSentimentDto;
import com.hanaback.hanaback.service.SentimentService;
import com.hanaback.hanaback.service.WordSentimentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SentimentPageController {
    private final SentimentService sentimentService;
    private final WordSentimentService wordSentimentService;

    public SentimentPageController(SentimentService sentimentService, WordSentimentService wordSentimentService) {
        this.sentimentService = sentimentService;
        this.wordSentimentService = wordSentimentService;
    }

    @GetMapping("/sentiment")
    public ResponseEntity<Map<String, Object>> getSentiment() {
        List<SentimentDto> sentimentData = sentimentService.getSenAll();

        Map<String, Object> response = new HashMap<>();
        response.put("isSuccess", true);
        response.put("code", 200);
        response.put("message", "성공입니다.");
        response.put("data", sentimentData);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/sentiment/detail")
    public ResponseEntity<Map<String, Object>> getWordSentiment(@RequestParam String state) {
        List<SentimentDto> sentimentData = sentimentService.getSentimentByState(state); // state 파라미터를 받아 처리
        List<WordSentimentDto> wordSentimentData = wordSentimentService.getWordSentimentByState(state);

        Map<String, Object> response = new HashMap<>();
        response.put("isSuccess", true);
        response.put("code", 200);
        response.put("message", "성공입니다.");
        response.put("data", sentimentData);
        response.put("worddata", wordSentimentData);
        return ResponseEntity.ok(response);
    }
}
