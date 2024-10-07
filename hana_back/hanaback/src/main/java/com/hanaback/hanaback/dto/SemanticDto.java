package com.hanaback.hanaback.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SemanticDto {
    private String name;
    private String imageUrl;
    private String faceUrl;
    private String semantic;
    private int persent;
    private double positive;
    private double nagative;

    public SemanticDto(String name, String imageUrl, String faceUrl, String semantic, int persent, double positive, double nagative) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.faceUrl = faceUrl;
        this.semantic = semantic;
        this.persent = persent;
        this.positive = positive;
        this.nagative = nagative;
    }
}
