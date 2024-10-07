package com.hanaback.hanaback.service;

import com.hanaback.hanaback.dto.SentimentDto;
import com.hanaback.hanaback.dto.WordSentimentDto;
import com.hanaback.hanaback.repository.SentimentTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SentimentService {
    private final SentimentTableRepository semanticTableRepository;

    public List<SentimentDto> getSenAll() {
        return semanticTableRepository.findAllSem();
    }
    public List<SentimentDto> getSentimentByState(String state) {
        return semanticTableRepository.findByState(state); // 새로운 메서드 추가
    }
}
