package com.hanaback.hanaback.dto;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class TExTableDto {
    private long id;
    private String state;
    private int period;
    private String time;
    private double exchange_rate;
    private double remit_send;
    private double remit_receive;
    private double compared_to_previous;
    private String date;
}
