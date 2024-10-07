package com.hanaback.hanaback.repository;

import com.hanaback.hanaback.dto.TExTableDto;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TExTableRepository {
    private final SqlSessionTemplate sqlSession;

    public List<TExTableDto> findTodayByState() {
        return sqlSession.selectList("TExTableDto.findTodayByState"); // MyBatis 쿼리 ID와 파라미터 사용
    }
}
