package com.hanaback.hanaback.controller;


import com.hanaback.hanaback.dto.NewsDto;
import com.hanaback.hanaback.service.NewsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class NewsPageController {
    private final NewsService newsService;

    public NewsPageController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/news")
    public ResponseEntity<Map<String, Object>> getNews() {
        List<NewsDto> newsData = newsService.getAllNews();

        Map<String, Object> response = new HashMap<>();
        response.put("isSuccess", true);
        response.put("code", 200);
        response.put("message", "성공입니다.");
        response.put("data", newsData);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/news/detail")
    public ResponseEntity<Map<String, Object>> getNewsDetail(@RequestParam String url) throws UnsupportedEncodingException {
        // 클라이언트에서 전달된 URL을 디코딩하지 않고 그대로 사용
        try {
            String decodedUrl = URLDecoder.decode(url, StandardCharsets.UTF_8.name());
            NewsDto newsDetail = newsService.getNewsByUrl(decodedUrl);

            if (newsDetail == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                        "isSuccess", false,
                        "code", 404,
                        "message", "뉴스 기사를 찾을 수 없습니다."
                ));
            }
            return ResponseEntity.ok(Map.of(
                    "isSuccess", true,
                    "code", 200,
                    "message", "성공입니다.",
                    "data", newsDetail
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "isSuccess", false,
                    "code", 500,
                    "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/news/state")
    public ResponseEntity<Map<String, Object>> getNewsByState(@RequestParam String state) {
        List<NewsDto> newsData = newsService.getNewsByState(state);
        Map<String, Object> response = new HashMap<>();
        response.put("isSuccess", true);
        response.put("code", 200);
        response.put("message", "성공입니다.");
        response.put("data", newsData);
        return ResponseEntity.ok(response);
    }
}
