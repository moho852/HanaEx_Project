package com.hanaback.hanaback.repository;

import com.hanaback.hanaback.dto.WordSentimentDto;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class WordSentimentTableRepository {
    private final SqlSessionTemplate sqlSession;

    public List<WordSentimentDto> findWordSentimentByState(String state) {
        return sqlSession.selectList("WordSentimentDto.findWordSentimentByState", state);
    }
}
