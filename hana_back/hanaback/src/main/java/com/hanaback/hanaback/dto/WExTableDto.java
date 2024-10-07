package com.hanaback.hanaback.dto;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class WExTableDto {
    private Long myRowId;
    private String currency;
    private String cashBuy;
    private String cashBuySpread;
    private String cashSell;
    private String cashSellSpread;
    private String remitSend;
    private String remitReceive;
    private String foreignCheckSell;
    private String baseRate;
    private String exchangeCommission;
    private String nonConvertibleRate;
    private String referenceDate;
    private String announcementRound;
    private String announcementTime;
}
