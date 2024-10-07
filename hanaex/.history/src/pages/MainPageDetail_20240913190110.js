// MainPageDetail.js

import React, { useState, useEffect } from "react";
import {
  Text,
  Modal,
  ModalOverlay,
  useDisclosure,
  Image,
  Divider,
} from "@chakra-ui/react";

import MainRecommandButton from "../components/MainRecommandButton";
import StockBox from "../components/StockBox";
import Account from "../components/Account";
import MainChart from "../components/MainChart";
import FxModal from "../modal/FxModal";
import axios from "axios";
import DireactModal from "../modal/DireactModal";
import ReserveModal from "../modal/ReserveModal";
import SelectModal from "../modal/SelectModal";
import SelectButton from "../components/SelectButton";
import ModifyModal from "../modal/ModifyModal";
import { useParams } from "react-router-dom";
import MainDropDown from "../components/DropDownMenu/MainDropDown";
import BuySell from "../components/MainPageDetail/BuySell";
import { IoReload } from "react-icons/io5";
import { useSelector } from "react-redux";
import "../css/style.css";
import PointBox from "../components/PointBox";

const MainPageDetail = () => {
  const user = useSelector((state) => state.user.user);
  // current price 받아오기
  const [currentInvestPrice, setCurrentInvestPrice] = useState(0);
  const [currentSellPrice, setCurrentSellPrice] = useState(0);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [showClander, setShowClander] = useState(false);
  const [changeState, setChangeState] = useState("USD");
  // 날짜
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  // 날짜 바꿔주는 함수
  const formatDateRange = (dates) => {
    const startDate = new Date(dates.startDate);
    const endDate = new Date(dates.endDate);

    // YYYY-MM-DD 형식으로 변환
    const startDateString = startDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];

    return `${startDateString}~${endDateString}`;
  };

  // 거래 내역 저장용 상태 변수
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Modal 관련 변수
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [modalType, setModalType] = useState("FxModal");

  // WonInput 관련 변수
  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");
  const [wonValue, setWonValue] = useState(0);
  const [vendWonValue, setVendWonValue] = useState(0);
  const [exchangeValue, setExchangeValue] = useState(0); // ExChangeInput 값을 저장할 상태
  const [calculatedValue, setCalculatedValue] = useState(0); // 계산 결과를 저장할 상태

  // 추가된 상태 변수: MainChart에 전달할 데이터
  const [consumData, setConsumData] = useState([]);
  const [todayData, setTodayData] = useState([]);

  // 토글 핸들러
  const handleToggle = () => {
    setSelected(!selected);
  };
  const { id } = useParams();
  console.log("id =", id);

  // axios
  // 데이터 받아오는 코드
  useEffect(() => {
    const getUseHistory = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8081/api/mainpage/detail?state=${id}`
        );

        console.log("result data : ", result.data);

        // 오늘 날짜를 가져옵니다.
        const todayDate = new Date().toISOString().split('T')[0];

        // MainChart에 전달할 데이터 설정
        const filteredConsumData = result.data.data.filter(
          (item) => item.state === changeState
        );
        const filteredTodayData = result.data.todayData.filter(
          (item) =>
            item.state === changeState &&
            item.date === todayDate // 날짜 조건 추가
        );

        setConsumData(filteredConsumData);
        setTodayData(filteredTodayData);

        // 날짜가 업데이트될 때마다 상태 갱신
        if (filteredTodayData.length > 0) {
          const { remit_send, remit_receive } = filteredTodayData[filteredTodayData.length - 1];
          setCurrentInvestPrice(remit_send);
          setCurrentSellPrice(remit_receive);
          setWonValue(remit_send);
          setVendWonValue(remit_receive);
        }

        console.log("filteredTodayData:", filteredTodayData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPriceLoading(true);
      }
    };
    getUseHistory();

    // 1분마다 데이터 갱신
    const interval = setInterval(() => {
      getUseHistory();
    }, 60000); // 60,000밀리초 = 1분

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(interval);
  }, [id, changeState]);

  useEffect(() => {
    console.log("value updated:", value); // value가 업데이트될 때 로그 출력
  }, [value]);

  // 날짜 초기화
  const handleSetValue = () => {
    setValue({
      startDate: null,
      endDate: null,
    });
  };

  // selected 상태에 따라 calculatedValue 계산
  useEffect(() => {
    let result;
    if (selected) {
      result = parseFloat(exchangeValue) * parseFloat(wonValue);
    } else {
      result = parseFloat(exchangeValue) * parseFloat(vendWonValue);
    }
    setCalculatedValue(isNaN(result) ? 0 : result.toFixed(2)); // 소수점 2자리까지 결과 표시
  }, [exchangeValue, wonValue, vendWonValue, selected]);

  // modal direct구매 로직
  useEffect(() => {
    // 값을 비교할 때 parseFloat를 사용하여 소수점 두 자리까지 고정합니다.
    const roundedWonValue = parseFloat(parseFloat(wonValue).toFixed(2));
    const roundedVendWonValue = parseFloat(parseFloat(vendWonValue).toFixed(2));
    const roundedCurrentInvestPrice = parseFloat(
      parseFloat(currentInvestPrice).toFixed(2)
    );
    const roundedCurrentSellPrice = parseFloat(
      parseFloat(currentSellPrice).toFixed(2)
    );

    console.log(
      "roundedWonValue:",
      roundedWonValue,
      "roundedCurrentInvestPrice:",
      roundedCurrentInvestPrice
    );
    console.log(
      "roundedVendWonValue:",
      roundedVendWonValue,
      "roundedCurrentSellPrice:",
      roundedCurrentSellPrice
    );

    if (roundedWonValue === roundedCurrentInvestPrice) {
      setShowClander(false);
    } else {
      setShowClander(true);
    }
  }, [wonValue, currentInvestPrice]);

  // 캘린더 보이는 로직
  useEffect(() => {
    const roundedVendWonValue = parseFloat(parseFloat(vendWonValue).toFixed(2));
    const roundedCurrentSellPrice = parseFloat(
      parseFloat(currentSellPrice).toFixed(2)
    );
    if (roundedVendWonValue === roundedCurrentSellPrice) {
      setShowClander(false);
    } else {
      setShowClander(true);
    }
  }, [vendWonValue, currentSellPrice]);

  // 스크롤과 고정 로직
  const scrollToSection = (sectionName) => {
    const section = document.querySelector(`div[name="${sectionName}"]`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const recommandSection = document.querySelector(
        `div[name="recommand-section"]`
      );
      const sectionTop = recommandSection.getBoundingClientRect().top;

      setIsFixed(sectionTop <= 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ReservedCard 클릭 시 호출되는 함수
  const handleReservedCardClick = (index) => {
    const selectedTransaction = transactionHistory[index];
    setSelectedTransaction({ ...selectedTransaction, index });

    setModalType("ReservedModal");
    onOpen();
  };

  // vers three
  const handlePurchaseClick = () => {
    let transactionType = selected ? "buy" : "sell";
    let fromAccountNumber = selected ? "하나저축예금" : "하나밀리언달러통장";
    let toAccountNumber = selected ? "하나밀리언달러통장" : "하나저축예금";
    let withdrawalAmount = 0; // 기본값 0 (ReserveModal일 경우)
    let depositAmount = 0; // 기본값 0 (ReserveModal일 경우)
    let reservationPeriod = "";

    if (!showClander) {
      const currentValue = selected ? wonValue : vendWonValue;
      const currentDate = new Date().toISOString().split("T")[0];
      setTransactionHistory((prevHistory) => [
        ...prevHistory,
        {
          value: currentValue,
          date: currentDate,
          type: transactionType,
          rangeDate: value,
          exchangeValue: exchangeValue,
        },
      ]);
    }

    const roundedWonValue = parseFloat(parseFloat(wonValue).toFixed(2));
    const roundedCurrentInvestPrice = parseFloat(
      parseFloat(currentInvestPrice).toFixed(2)
    );
    const roundedVendWonValue = parseFloat(parseFloat(vendWonValue).toFixed(2));
    const roundedCurrentSellPrice = parseFloat(
      parseFloat(currentSellPrice).toFixed(2)
    );

    if (
      (selected && roundedWonValue === roundedCurrentInvestPrice) ||
      (!selected && roundedVendWonValue === roundedCurrentSellPrice)
    ) {
      // setModalType으로 DirectModal로 설정한 후 바로 axios 요청을 보내는 로직 추가
      setModalType("DirectModal");
      reservationPeriod = "NONE";

      withdrawalAmount = selected ? calculatedValue : exchangeValue;
      depositAmount = selected ? exchangeValue : calculatedValue;

      // 트랜잭션 데이터 생성
      const transactionData = {
        user_id: user.user_id,
        from_account_number: fromAccountNumber,
        to_account_number: toAccountNumber,
        withdrawal_amount: withdrawalAmount,
        deposit_amount: depositAmount,
        currency_code: changeState,
        transaction_type: transactionType,
        conclusion_status: "completed",
        reservation_period: reservationPeriod,
        request_amount : exchangeValue,
      };

      // DirectModal로 설정 후 데이터 전송
      axios
        .post("http://localhost:8082/api/trinsert", transactionData)
        .then((response) => {
          console.log("Transaction inserted:", response.data);
        })
        .catch((error) => {
          console.error("Error inserting transaction:", error);
        });
    } else {
      // ReserveModal 로직 처리
      console.log("Passing value to ReserveModal:", value);
      setModalType("ReserveModal");

      withdrawalAmount = selected ? calculatedValue : exchangeValue;
      depositAmount = selected ? exchangeValue : calculatedValue;
      reservationPeriod = formatDateRange(value);

      // ReserveModal인 경우 추가 로직
      const reserveTransactionData = {
        user_id: user.user_id,
        from_account_number: fromAccountNumber,
        to_account_number: toAccountNumber,
        withdrawal_amount: withdrawalAmount,
        deposit_amount: depositAmount,
        currency_code: changeState,
        transaction_type: transactionType,
        conclusion_status: "reserved",
        reservation_period: reservationPeriod,
      };

      // ReserveModal일 경우 axios 요청
      axios
        .post("http://localhost:8082/api/trinsert", reserveTransactionData)
        .then((response) => {
          console.log("Reserve transaction inserted:", response.data);
        })
        .catch((error) => {
          console.error("Error inserting reserve transaction:", error);
        });
    }
  };

  // ReservedModal에서 트랜잭션 업데이트 후 서버로 PUT 요청
  const handleTransactionUpdate = (updatedTransaction) => {
    const transactionToUpdate = {
      ...updatedTransaction,
      reservation_period: updatedTransaction.reservation_period || "",
    };

    axios
      .put("http://localhost:8082/api/updateTransaction", transactionToUpdate)
      .then((response) => {
        console.log("Transaction updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating transaction:", error);
      });

    onClose();
  };

  // Modal type 변경
  const handleSelectClick = () => {
    setModalType("SelectModal");

    // axios로 서버에 요청 보내기
    axios
      .get("http://localhost:8082/api/reserved")
      .then((response) => {
        setTransactionHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reserved transactions:", error);
      });
  };

  // FxModal로 돌아가는 기능 추가
  const handleBackToFxModal = () => {
    setModalType("FxModal");
  };

  console.log(showClander);
  if (!isPriceLoading) return <div>로딩중입니다.</div>;

  console.log("mainpage : ", user);
  return (
    <div className="w-[960px] flex flex-col py-1 px-10">
      {/* 살 때 팔 때 */}
      <div
        className="w-full px-48 py-2 rounded-lg my-2 bg-white"
        style={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex justify-center items-center my-3">
          <MainDropDown
            changeState={changeState}
            setChangeState={setChangeState}
          />
          <Text className="text px-3 border-2 text-slate-600 border-green-500 rounded-full">
            {" "}
            Lv3 우대 80%{" "}
          </Text>
        </div>

        <BuySell
          currentInvestPrice={currentInvestPrice}
          currentSellPrice={currentSellPrice}
        />
      </div>
      <div
        className="flex flex-col items-center bg-white rounded-lg py-5"
        style={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex justify-end w-full px-16 mt-2 gap-2">
          <div className="flex gap-1">
            <Text className="text-slate-500">
              고시회차 {todayData[todayData.length - 1]?.period || "정보 없음"}
            </Text>
          </div>
          <div className="flex items-center gap-1">
            <Text className="text-slate-500">
              {todayData[todayData.length - 1]?.time || "정보 없음"}
            </Text>
            <IoReload className="text-slate-500" />
          </div>
        </div>

        {/* 메인 차트에 데이터 전달 */}
        <MainChart
          id={id}
          changeState={changeState}
          consumData={consumData}
          todayData={todayData}
        />

        {/* 최고가 최저가 */}
        <div className="flex gap-3 py-1">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#b6e9e5" }}
            ></div>
            <Text>최저가-최고가</Text>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 border-2 rounded-full"
              style={{ backgroundColor: "#b6e9e5", borderColor: "#32B3B7" }}
            ></div>
            <Text>매매기준율(종가)</Text>
          </div>
        </div>
      </div>
      {/* 구매 버튼 판매 버튼 */}
      <div
        className="flex justify-center py-2 bg-white gap-6 my-2 rounded-lg"
        style={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
      >
        <button
          onClick={onOpen}
          className="text-white bt-background px-4 py-2 rounded hover:bg-white hover:border hover:border-[#009577] hover:text-[#009577] transition-all"
          style={{ height: "42px", width: "200px" }}
        >
          살래요
        </button>
        <SelectButton onOpen={onOpen} handleSelectClick={handleSelectClick} />
      </div>

      <div
        name="recommand-section"
        className="px-3 py-5 flex bg-slate-300 mt-1"
        style={{ overflow: "visible" }}
      >
        {isFixed && (
          <div
            name="fake-section"
            className="bg-slate-50 px-5 py-5 flex-none w-[145px]"
          ></div>
        )}
        {/* left section */}
        <div
          name="left-section"
          className={`bg-slate-50 px-5 py-5 flex-none w-[145px] ${
            isFixed ? "fixed top-0 z-10" : ""
          }`}
          style={{ top: isFixed ? "10px" : "auto" }}
        >
          <div className="flex items-center mb-3">
            <Text className="mr-1 font-semibold">USD/KRW</Text>
            <Image boxSize={"20px"} src="/image/usd_flag.png"></Image>
          </div>

          <MainRecommandButton
            text={"투자포인트"}
            scrollToSection={() => scrollToSection("1-1")}
          />
          <MainRecommandButton
            text={"추천주식"}
            scrollToSection={() => scrollToSection("1-2")}
          />
          <MainRecommandButton
            text={"추천상품"}
            scrollToSection={() => scrollToSection("1-3")}
          />
        </div>
        <div name="right-section" className="bg-slate-50 p-5 flex-1">
          <div name="1-1" className="bg-slate-400 h-[400px] mt-6 py-3">
            <Text className="text-xl font-semibold leading-0">
              추천포인트 3가지
            </Text>
            <Divider className="my-3" orientation="horizontal" />
            <div className="flex justify-around">
              <PointBox />
              <PointBox />
              <PointBox />
            </div>
          </div>
          <div name="1-2" className="bg-slate-400 h-80 mt-6 py-3">
            <Text className="text-xl font-semibold leading-0">
              주식추천 TOP 3
            </Text>
            <Divider className="my-3" orientation="horizontal" />
            <div className="flex justify-around">
              <StockBox />
              <StockBox />
              <StockBox />
            </div>
          </div>
          <div name="1-3" className="bg-slate-400 h-80 mt-6 px-6 py-3">
            <Text className="text-xl font-semibold leading-0">상품추천</Text>
            <Divider className="my-3" orientation="horizontal" />
            <Account />
            <Account />
            <Account />
          </div>
          <div name="1-4" className="bg-slate-400 h-80 mt-6 px-6 py-3"></div>
        </div>
      </div>

      {/* 모달 */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        {modalType === "FxModal" && (
          <FxModal
            selected={selected}
            handleToggle={handleToggle}
            format={format}
            parse={parse}
            wonValue={wonValue}
            vendWonValue={vendWonValue}
            setWonValue={setWonValue}
            setVendWonValue={setVendWonValue}
            exchangeValue={exchangeValue}
            setExchangeValue={setExchangeValue}
            calculatedValue={calculatedValue}
            onClose={onClose}
            onPurchaseClick={handlePurchaseClick} // 구매 버튼 클릭 핸들러
            showClander={showClander}
            value={value}
            setValue={setValue}
            handleSetValue={handleSetValue}
            changeState={changeState}
            setChangeState={setChangeState}
            currentInvestPrice={currentInvestPrice}
            currentSellPrice={currentSellPrice}
          />
        )}
        {modalType === "DirectModal" && (
          <DireactModal
            onClose={onClose}
            onPurchaseClick={handleBackToFxModal}
            // 달러 몇개
            exchangeValue={exchangeValue}
            // 환산금액
            calculatedValue={calculatedValue}
            // 살래요 금액
            currentInvestPrice={currentInvestPrice}
            // 팔래요 금액
            currentSellPrice={currentSellPrice}
            // 살래요 팔래요 구분여부
            selected={selected}
            // 현재 나라
            changeState={changeState}
            // 날짜 초기화
            handleSetValue={handleSetValue}
          />
        )}
        {modalType === "ReserveModal" && (
          <ReserveModal
            onClose={onClose}
            onPurchaseClick={handleBackToFxModal}
            // 날짜
            value={value}
            // 달러 몇개
            exchangeValue={exchangeValue}
            // 환산금액
            calculatedValue={calculatedValue}
            // 살래요 금액
            currentInvestPrice={currentInvestPrice}
            // 팔래요 금액
            currentSellPrice={currentSellPrice}
            // 살래요 팔래요 구분여부
            selected={selected}
            // 현재 나라
            changeState={changeState}
            // 날짜 초기화
            handleSetValue={handleSetValue}
          />
        )}
        {modalType === "SelectModal" && (
          <SelectModal
            onClose={onClose}
            onPurchaseClick={handleBackToFxModal}
            transactionHistory={transactionHistory}
            handleReservedCardClick={handleReservedCardClick}
            changeState={changeState}
            setChangeState={setChangeState}
            handleBackToFxModal={handleBackToFxModal}
          />
        )}
        {modalType === "ReservedModal" && selectedTransaction && (
          <ModifyModal
            selectedTransaction={selectedTransaction}
            onClose={onClose}
            handleTransactionUpdate={handleTransactionUpdate}
            handleBackToFxModal={handleBackToFxModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default MainPageDetail;

