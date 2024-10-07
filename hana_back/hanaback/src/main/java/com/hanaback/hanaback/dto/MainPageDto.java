package com.hanaback.hanaback.dto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MainPageDto {
    private int index;
    private String name;
    private String imageUrl;
    private int currentPrice;
    private String date;
    private double increase;
    private List<ChartDataDto> chartData;
}

