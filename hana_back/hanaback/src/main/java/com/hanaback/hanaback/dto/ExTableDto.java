package com.hanaback.hanaback.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class ExTableDto {
    private long id;
    private String state;
    private String date;
    private double cashBuy;
    private double cashSell;
    private double remitSend;
    private double remitReceive;
    private double foreignCurrencyCheckSell;
    private double exchangeRate;
    private double comparedToPrevious;
    private double exchangeFeeRate;
    private double usdConversionRate;
}
