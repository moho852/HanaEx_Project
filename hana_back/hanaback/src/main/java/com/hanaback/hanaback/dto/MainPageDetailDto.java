package com.hanaback.hanaback.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MainPageDetailDto {
    private String day;
    private List<Double> price;
    private double baserate;

    public MainPageDetailDto(String day, List<Double> price, double baserate) {
        this.day = day;
        this.price = price;
        this.baserate = baserate;
    }
}
