package com.hanaback.hanaback.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;


@Data
@AllArgsConstructor
public class ChartEntryDto {
    private int index;
    private String name;
    private String imageUrl;
    private double currentPrice;
    private String date;
    private double increase;
    private List<ChartDataDto> chartData;
}
