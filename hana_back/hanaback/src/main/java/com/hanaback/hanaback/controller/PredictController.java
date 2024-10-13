package com.hanaback.hanaback.controller;

import com.hanaback.hanaback.dto.PredictDto;
import com.hanaback.hanaback.service.PredictService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PredictController {

    private final PredictService predictService;

    public PredictController(PredictService predictService) {
        this.predictService = predictService;
    }

    @GetMapping("/predict")
    public List<PredictDto> getPredictData() {
        return predictService.getPredictData();
    }
}
