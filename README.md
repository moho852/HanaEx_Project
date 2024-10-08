# HanaEx(Hana Easy Foreign Exchange)
#### 하나금융티아이 채용연계형 교육 최종프로젝트
#### 정보제공부터 외환투자까지 하나에 누구나 쉽고 간편하게 즐기는 외환 거래 서비스 HanaEx
![hanaex_1](https://github.com/user-attachments/assets/19253dcd-65ea-4431-8b49-a2b6a10c649a)

# 1. 프로젝트 개요
### 1-1. 기획 배경
![PPT_기획의도1](https://github.com/user-attachments/assets/803239ba-c3c8-4b7b-a9a3-e230d8ed633f)
- 2024년 1분기 원달러 1,400원 돌파 <b>환테크</b> 관심증가
- 무료환전 전쟁 <b>외환에 대한 관심도 함께 증가</b>
- 외환시장 구조 개선 발표 외환거래 시강 규제완화

![PPT 프로젝트 개요-3](https://github.com/user-attachments/assets/99340fdd-f743-46bd-8f23-8960b4874f6e)
- 청소년들의 <b>좋지 않은 금융 실태</b>를 나타낸 다양한 기사들
- 금융 및 경제 교육도 <b>미흡</b>한 상황

---
![PPT 프로젝트 개요-1](https://github.com/user-attachments/assets/ac352bc7-23a1-47e0-b055-43e983c27d1b)
- <b>하나만영의 효과</b>
- <b>가계부 작성</b>을 통해 충동적인 구매를 억제하고 경제적 스트레스를 줄임
- <b>금융 및 경제 교육</b>을 통해 금융 지식 함양 및 의사결정 능력을 향상
- 습관을 형성하는데 기여하고 성취감을 증대시킬 수 있는 <b>챌린지 시스템</b> 도입


### 1-2. 기대 효과
![PPT 프로젝트 개요-2](https://github.com/user-attachments/assets/811fde43-528b-4cce-bef1-cdd167868a07)
- 하나만영을 통해 <b>건강한 금융 습관</b>을 형성하고
<b>금융 경제 지식 함양</b> 가능
- 기업은 <b>미래 고객을 확보</b>하고 <b>기업 이미지 제고</b>가 가능함


### 1-3. 개발 일정
![PPT 프로젝트 일정](https://github.com/user-attachments/assets/cb054b41-86aa-435c-89c2-6a09ded244cb)
<b>개발 수행 기간: 2024.09.02 ~ 2024.10.17</b>

# 2. 프로젝트 설계
### 2-1. 주요 기능
![PPT 주요 기능](https://github.com/user-attachments/assets/dc04523e-3021-48ac-b2cc-b2d7401e00b9)
### 챌린지를 기반으로 금융 습관을 형성하고 금융 경제 지식 함양을 목표

#### 챌린지
- 오늘의 퀴즈: 금융 경제 관련 퀴즈를 풀며 지식 함양하는 챌린지
- 하나타로: 금융 운을 확인할 수 있는 타로 챌린지
- 용돈 조르기: 부모님의 챌린지를 받아 용돈을 받을 수 있는 챌린지
- 적금 챌린지: 구매하고 싶은 물품을 위해 돈을 모을 수 있는 챌린지
- 가계부 챌린지: 하루 단위로 가계부와 소비 계획을 작성할 수 있는 챌린지

#### 소비 인사이트 및 금융 트랜드
- 소비 레포트: 자신의 소비 내역과 동향을 전체적으로 확인할 수 있는 레포트
- 쉬운 금융 뉴스: 어려운 금융 경제 뉴스와 관련 단어들을 쉽게 요약

#### 커뮤니케이션
- 채팅: 챌린지 공유와 간편 송금이 가능한 채팅

#### 그 외
- 랭킹: 학교별, 지역별, 나이별 챌린지 성공 현황을 랭킹화


### 2-2. 시스템 아키텍처
![PPT 시스템 아키텍처](https://github.com/user-attachments/assets/56a3d053-7f79-4db3-a153-d7fc670347ec)
- <b>하나만영:</b> Google Cloud 가상머신 배포 / Azure MySQL 활용
- <b>하나은행:</b> Google Cloud 가상머신 배포 / Oracle Cloud 오라클 활용
- <b>외부 API:</b> OpenAI와 Naver Open API 활용
- <b>도메인:</b> [www.hanamanyoung.life](http://www.hanamanyoung.life/) 

### 2-3. 활용 기술
![PPT 프로젝트 설계](https://github.com/user-attachments/assets/64c03468-926c-43d6-b09a-164566d80374)
- 스프링 스케쥴러: 적금 챌린지 및 자동 이체 적용
- 크롤링 및 GPT: 뉴스 크롤링 후 쉬운 금융 뉴스 요약 및 단어 추출
- 인증 및 보안: Spring Security와 JWT를 활용한 토큰 발급 및 로그인
- WebSocket: 웹소켓 기반의 실시간 채팅 구현
- Naver CLOVA OCR: 학생증의 학교명 자동 인식 및 추출

### 3. 발표 ppt
![PPT Q A](https://github.com/user-attachments/assets/014044bc-5f72-4ed1-b84c-e10802059f8c)
[장규은_하나에서만나Young.pdf](https://github.com/user-attachments/files/17272034/_.Young.pdf)

### 4. 시연 동영상
<a href="">![image](https://github.com/user-attachments/assets/faf51107-1a56-40a9-9449-b77e983a6738)</a><br/>

# 4. 본인 소개
| 구분           | 내용                       | 비고                                       |
| -------------- | -------------------------- | ------------------------------------------ |
| 이름           | 양진안                      | <img src="https://github.com/user-attachments/assets/df7f473a-ee6d-4f00-a780-c83ec3d183c6" width="150"> |
| 연락처         | 이메일                       | m0_ho191113@naver.com                   |
| 학력 사항      | 한국외국어대학교 FATI 졸업 | 2023.02                                 |
| Skill Set      | Language                    | Javascript, Java, Python                |
|                | Framework & Library         | Spring, Mybatis, React                     |
|                | Database                    | Oracle, MySQL                              |
|                | Etc                         | Git, Oracle Cloud, AWS, Azure              |
| 자격증         | SQLD (SQL개발자)             | 2024.04.05  |
| 수상경력       | 예술데이터가 바꾸는 세상 아이디어톤 우수상                       | 한국문화예술위원회 (2023) |
|               | KT AIVLE school Big Project                                | KT, 고용노둥부 (2023) |
|              |Dacon 주관 부동산 경매 예측 경진대회 2등   | Dacon (2023) | 
|              | 데이터청년캠퍼스 - 자연어처리 기반 딥러닝융합과정 최우수상       | 한국데이터산업진흥원 (2022) |
|              | HUFSAbility Festival | 한국외국어대학교 (2022) |
| 교육이력       | 하나금융티아이 채용연계형 교육 1200시간<br/>(한국폴리텍대학교 광명융합기술교육원 - 데이터분석과) | 2024.03.04 ~ 2024.10.18 (1200시간) |
|              | KT AIVLE school ai track (KT, 고용노동부)| 2023.01 ~ 2023.07 (841시간) |
|              | 데이터청년캠퍼스 - 자연어처리 기반 딥러닝융합과정 최우수상 (한국데이터산업진흥원)| 2022.06 ~ 2022.08 (350시간) |
