package hanaback.hanabackuser.service;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    // SDK를 사용하기 위한 Service 객체 초기화
    private final DefaultMessageService messageService;



    @Value("${coolsms.from}")
    private String fromNumber;

    // Constructor에서 NurigoApp을 초기화
    public SmsService() {
        this.messageService = NurigoApp.INSTANCE.initialize("NCSKJQYBDPM34HMU", "TBDVGTGGXJWROKICBQMPXCAHZ7ARY9YC", "https://api.coolsms.co.kr");
    }

    // SMS 전송 로직
    public String sendSMS(String phoneNumber) {
        String randomNum = makeRandomNumber();  // 랜덤 인증번호 생성
        //String msgString = String.format("[Travel Home] \n회원가입을 위한 인증번호는 %s 입니다.", randomNum);
        String msgString = "[HANA EX] \n예약된 건이 채결되었습니다.";

        // 메시지 생성
        Message message = new Message();
        message.setFrom(fromNumber);  // 발신자 번호 설정
        message.setTo(phoneNumber.replaceAll("-", ""));  // 수신자 번호에서 하이픈 제거
        message.setText(msgString);  // 메시지 내용 설정

        // 메시지 전송
        messageService.sendOne(new SingleMessageSendingRequest(message));

        return randomNum;  // 생성한 랜덤 인증번호 반환
    }

    // 6자리 랜덤 인증번호 생성 메서드
    private String makeRandomNumber() {
        int randomNum = (int)(Math.random() * 900000) + 100000;  // 6자리 숫자 생성
        return String.valueOf(randomNum);
    }
}
