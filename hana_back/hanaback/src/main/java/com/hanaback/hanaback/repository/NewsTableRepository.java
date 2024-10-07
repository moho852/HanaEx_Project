package com.hanaback.hanaback.repository;

import com.hanaback.hanaback.dto.NewsDto;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class NewsTableRepository {
    private final SqlSessionTemplate sqlSession;

    public List<NewsDto> findAll() {
        return sqlSession.selectList("NewsTableDto.findAll");
    }
    // URL로 뉴스 데이터를 찾는 메서드
    public NewsDto findByUrl(String url) {
        try {
            System.out.println("Executing findByUrl with URL: " + url);
            return (NewsDto) sqlSession.selectList("NewsTableDto.findByUrl", url).get(0);
        } catch (Exception e) {
            System.err.println("Error occurred while fetching news by URL: " + e.getMessage());
            throw e;
        }
    }

    public List<NewsDto> findByState(String state) {
        return sqlSession.selectList("NewsTableDto.findByState", state);
    }

}