package com.hanaback.hanaback.repository;


import com.hanaback.hanaback.dto.SentimentDto;
import com.hanaback.hanaback.dto.WordSentimentDto;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class SentimentTableRepository {
    private final SqlSessionTemplate sqlSession;

    public List<SentimentDto> findAllSem() {
        return sqlSession.selectList("SentimentDto.findAllSem"); // "SentimentDto"와 "findAllSem"이 일치하도록 수정
    }

    public List<SentimentDto> findByState(String state) {
        System.out.println(state);
        return sqlSession.selectList("SentimentDto.findByState", state); // 새로운 메서드 추가
    }
}