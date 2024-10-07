package com.hanaback.hanaback.repository;

import com.hanaback.hanaback.dto.ExTableDto;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ExtableRepository {
    private final SqlSessionTemplate sql;

    public List<ExTableDto> findAll() {
        return sql.selectList("ExTableDto.findAll");
    }

}
