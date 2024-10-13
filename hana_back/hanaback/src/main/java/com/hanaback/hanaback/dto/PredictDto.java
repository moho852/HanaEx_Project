package com.hanaback.hanaback.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class PredictDto {
    private Double todayPredict;
    private String todayFluctuationRange;
    private String todayPredictReason;
    private Double tomorrowPredict;
    private String tomorrowFluctuationRange;
    private String tomorrowPredictReason;
    private String weekPredict;
    private String weekFluctuationRange;
    private String weekReason;
    private String monthPredict;
    private String monthFluctuationRange;
    private String monthReason;
    private String finalAnalysis;
}
