package com.hanaback.hanaback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WordSentimentDto {
    private String state;
    private String text;
    private int value;
    private String sentiment;
}
