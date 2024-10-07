//package hanaback.hanabackuser.dto;
//
//import lombok.Getter;
//import lombok.RequiredArgsConstructor;
//import lombok.Setter;
//
//@Getter
//@Setter
//@RequiredArgsConstructor
//public class TodayDataDto {
//    private long id;
//    private String state; // currency_code에 해당
//    private int period;
//    private String time;
//    private double exchangeRate;
//    private double remitSend;
//    private double remitReceive;
//    private double comparedToPrevious;
//    private String date;
//}
package hanaback.hanabackuser.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class TodayDataDto {
    private long id;
    private String state;

    private int period;
    private String time;

    @JsonProperty("exchange_rate")
    private double exchangeRate;

    @JsonProperty("remit_send")
    private double remitSend;

    @JsonProperty("remit_receive")
    private double remitReceive;

    @JsonProperty("compared_to_previous")
    private double comparedToPrevious;

    private String date;
}
