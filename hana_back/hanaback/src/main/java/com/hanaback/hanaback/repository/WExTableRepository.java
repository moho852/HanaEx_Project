package com.hanaback.hanaback.repository;

import com.hanaback.hanaback.dto.WExTableDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class WExTableRepository {

    private final SqlSession sqlSession;

    // SqlSession을 주입받는 생성자
    public WExTableRepository(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    // 모든 데이터를 가져오는 메서드
    public List<WExTableDto> findAll() {
        return sqlSession.selectList("com.hanaback.hanaback.repository.WExTableRepository.findAll");
    }
}