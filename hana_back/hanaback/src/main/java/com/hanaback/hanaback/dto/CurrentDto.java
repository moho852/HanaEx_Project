package com.hanaback.hanaback.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CurrentDto {
    private String invest;
    private String sell;

    public CurrentDto(String invest, String sell) {
        this.invest = invest;
        this.sell = sell;
    }
}
