package com.hanaback.hanaback.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class HrTableDto {
    private long id;
    private String date;
    private String open;
    private String high;
    private String low;
    private String close;
    private String state;
}
