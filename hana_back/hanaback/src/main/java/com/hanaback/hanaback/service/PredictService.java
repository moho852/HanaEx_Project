package com.hanaback.hanaback.service;

import com.hanaback.hanaback.dto.PredictDto;
import com.hanaback.hanaback.repository.PredictTableRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PredictService {
    private final PredictTableRepository predictTableRepository;

    public PredictService(PredictTableRepository predictTableRepository) {
        this.predictTableRepository = predictTableRepository;
    }

    public List<PredictDto> getPredictData() {
        return predictTableRepository.findAll();
    }
}
