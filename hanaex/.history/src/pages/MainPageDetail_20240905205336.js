// MainPageDetail
import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
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

const MainPageDetail = () => {
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

  // 토글 핸들러
  const handleToggle = () => {
    setSelected(!selected);
  };
  const { id } = useParams();
  console.log("id =", id);
  // axios
  // 내가 살떄 내가 팔때 받아오는 코드
  useEffect(() => {
    const getUseHistory = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8081/api/mainpage/detail?state=${id}`
        );

        const filteredData = result.data.todayData.filter(
          (item) => item.state === changeState
        );

        if (filteredData.length > 0) {
          const { remit_send, remit_receive } = filteredData[0];
          setCurrentInvestPrice(remit_send);
          setCurrentSellPrice(remit_receive);
          setWonValue(remit_send);
          setVendWonValue(remit_receive);
        }
        console.log(filteredData)
        
      } catch (error) {
        console.log(error);
      } finally {
        setIsPriceLoading(true);
      }
    };
    getUseHistory();
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
    setSelectedTransaction({ ...transactionHistory[index], index });
    setModalType("ReservedModal");
    onOpen();
  };

  // Modal type 변경
  // 구매하기 버튼 클릭 시 거래 내역에 추가
  const handlePurchaseClick = () => {
    if (!showClander) {
      const currentValue = selected ? wonValue : vendWonValue;
      const currentDate = new Date().toISOString().split("T")[0];
      const transactionType = selected ? "살래요" : "팔래요";

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
    // 살때 팔때 금액과 내가 고른 금액이 같으면 구매
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
      setModalType("DirectModal");
    } else {
      console.log("Passing value to ReserveModal:", value);
      setModalType("ReserveModal");
    }
    // handleSetValue();
  };

  // ReservedModal에서 값이 변경될 때 호출되는 함수
  const handleTransactionUpdate = (updatedValue, updatedExchangeValue) => {
    setTransactionHistory((prevHistory) =>
      prevHistory.map((item, idx) =>
        idx === selectedTransaction.index
          ? {
              ...item,
              value: updatedValue,
              exchangeValue: updatedExchangeValue,
            }
          : item
      )
    );
    onClose();
  };

  // Modal type 변경
  const handleSelectClick = () => {
    setModalType("SelectModal");
  };

  // FxModal로 돌아가는 기능 추가
  const handleBackToFxModal = () => {
    setModalType("FxModal");
  };
  console.log(showClander);
  if (!isPriceLoading) return <div>로딩중입니다.</div>;

  return (
    <div className="w-[960px] flex flex-col py-1 px-10">
      {/* 살 때 팔 때 */}

      <div className="w-full px-48 py-2 rounded-lg my-2 bg-white drop-shadow-2xl">
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
      <div className="flex flex-col items-center bg-white rounded-lg py-5 drop-shadow-2xl">
        <Text>고시회차</Text>
        <Text>\458</Text>
        <Text>20:51:49</Text>
        {/* 메인 차트 */}
        <MainChart id={id} changeState={changeState} />
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
      <div className="flex justify-center py-2 bg-white gap-6 my-2 rounded-lg drop-shadow-2xl">
        <Button
          onClick={onOpen}
          colorScheme="teal"
          variant="outline"
          height="42px"
          width="200px"
        >
          살래요
        </Button>
        <SelectButton onOpen={onOpen} handleSelectClick={handleSelectClick} />
      </div>
      <div
        name="recommand-section"
        className="px-3 py-5 flex bg-slate-300 mt-1 gap-5"
        style={{ overflow: "visible" }}
      >
        {isFixed && (
          <div
            name="fake-section"
            className="bg-slate-50 px-5 py-5 flex-none w-56"
          ></div>
        )}
        <div
          name="left-section"
          className={`bg-slate-50 px-5 py-5 flex-none w-56 ${
            isFixed ? "fixed top-0 z-10" : ""
          }`}
          style={{ top: isFixed ? "10px" : "auto" }}
        >
          <div className="flex items-center mb-3">
            <Text className="text-2xl mr-2">USD/KRW</Text>
            <Image boxSize={"32px"} src="/image/usd_flag.png"></Image>
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
          <div name="1-1" className="bg-slate-400 h-80 mt-6"></div>
          <div name="1-2" className="bg-slate-400 h-80 mt-6 px-6 py-3">
            <Text className="text-xl font-semibold leading-0">
              주식추전 TOP 3
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
          />
        )}
        {modalType === "ReservedModal" && selectedTransaction && (
          <ModifyModal
            transaction={selectedTransaction}
            onClose={onClose}
            onUpdate={handleTransactionUpdate}
          />
        )}
      </Modal>
    </div>
  );
};

export default MainPageDetail;
