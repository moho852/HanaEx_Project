package com.hanaback.hanaback.service;

import com.hanaback.hanaback.dto.NewsDto;
import com.hanaback.hanaback.repository.NewsTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {
    private final NewsTableRepository newsTableRepository;

    public List<NewsDto> getAllNews() {
        return newsTableRepository.findAll();
    }

    // URL로 뉴스 데이터를 가져오는 메서드
    public NewsDto getNewsByUrl(String url) {
        return newsTableRepository.findByUrl(url);
    }

    public List<NewsDto> getNewsByState(String state) {
        return newsTableRepository.findByState(state);
    }
}