package com.hanaback.hanaback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class NewsDto {
    private String state; // 뉴스 상태 (예: 'Active', 'Archived' 등)
    private String url; // 뉴스 URL
    private String title; // 뉴스 제목
    private String imageUrl; // 뉴스 이미지 URL
    private String content; // 뉴스 내용
    private String news_summary; // 뉴스 요약
    private String result; // 뉴스 결과 (예: 'Positive', 'Negative' 등)
    private String news_analysis; // 뉴스 분석
    private String source;
}