package com.hanaback.hanaback.service;


import com.hanaback.hanaback.dto.WordSentimentDto;
import com.hanaback.hanaback.repository.WordSentimentTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WordSentimentService {
    private final WordSentimentTableRepository wordSentimentTableRepository;

    public List<WordSentimentDto> getWordSentimentByState(String state) {
        return wordSentimentTableRepository.findWordSentimentByState(state);
    }
}
