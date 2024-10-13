package com.hanaback.hanaback.repository;

import com.hanaback.hanaback.dto.PredictDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PredictTableRepository {

    private final SqlSession sqlSession;


    public PredictTableRepository(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public List<PredictDto> findAll() {
        return sqlSession.selectList("PredictDto.findAll");
    }
}
