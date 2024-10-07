package com.hanaback.hanaback.repository;

import com.hanaback.hanaback.dto.HrTableDto;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class HrTableRepository {
    private final SqlSessionTemplate sqlSession;

    public List<HrTableDto> findByState() {

        return sqlSession.selectList("HrTableDto.findByState");
    }// 새로운 메서드 추가
}
