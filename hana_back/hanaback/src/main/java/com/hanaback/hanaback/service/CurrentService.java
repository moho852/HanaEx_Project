package com.hanaback.hanaback.service;

import com.hanaback.hanaback.dto.CurrentDto;
import org.springframework.stereotype.Service;

@Service
public class CurrentService {
    public CurrentDto getCurrentData() {
        // 예시 데이터를 설정합니다.
        return new CurrentDto("1381.13", "1364.13");
    }
}
