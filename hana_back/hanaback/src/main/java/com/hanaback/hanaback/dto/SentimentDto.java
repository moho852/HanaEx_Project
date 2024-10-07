package com.hanaback.hanaback.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SentimentDto {
    private String state;
    private String semantic;
    private double positive;
    private double nagative;
}
