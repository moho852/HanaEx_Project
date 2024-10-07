//package hanaback.hanabackuser.dto;
//
//import lombok.Getter;
//import lombok.RequiredArgsConstructor;
//import lombok.Setter;
//
//@Getter
//@Setter
//@RequiredArgsConstructor
//public class AccountsDetDto {
//    private String accounts_name;
//    private String krw;
//    private String usd;
//    private String jpy;
//    private String eur;
//}
package hanaback.hanabackuser.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class AccountsDetDto {
    private String accounts_name;
    private double krw;
    private double usd;
    private double jpy;
    private double eur;
}
