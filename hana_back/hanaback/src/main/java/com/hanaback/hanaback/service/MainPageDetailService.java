package com.hanaback.hanaback.service;

import com.hanaback.hanaback.dto.HrTableDto;
import com.hanaback.hanaback.dto.TExTableDto;
import com.hanaback.hanaback.repository.HrTableRepository;
import com.hanaback.hanaback.repository.TExTableRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainPageDetailService {

    private final HrTableRepository hrTableRepository;
    private final TExTableRepository tExTableRepository;

    public MainPageDetailService(HrTableRepository hrTableRepository, TExTableRepository tExTableRepository) {
        this.hrTableRepository = hrTableRepository;
        this.tExTableRepository = tExTableRepository;
    }
    public List<HrTableDto> getDetailByState() {
        return hrTableRepository.findByState();
    }

    public List<TExTableDto> getTodayByState() {
        return tExTableRepository.findTodayByState();
    }
}
