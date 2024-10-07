
// import React, { useEffect, useState } from 'react';
// import { Text, Image } from '@chakra-ui/react';
// import ChartCard from '../components/ChartCard';
// import FlowText from '../components/FlowText';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { FaRegStar } from "react-icons/fa";
// import { IoMdArrowDropup } from "react-icons/io";
// import WorldExInfo from '../components/WorldExInfo';

// const MainPage = () => {
//   const [consumData, setConsumData] = useState([]);
//   const [worldConsumData, setWorldConsumData] = useState([]);
//   const [selectedCurrency, setSelectedCurrency] = useState('USD');  // 기본값 'USD'
//   const user = useSelector((state) => state.user.user);

//   useEffect(() => {
//     const getUseHistory = async () => {
//       try {
//         const result = await axios.get("http://localhost:8081/api/mainpage");
//         const result2 = await axios.get("http://localhost:8081/api/mainpage/worldtable");
//         setConsumData(result.data.data);
//         setWorldConsumData(result2.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getUseHistory();
//   }, []);

//   // currency에서 실제 통화 코드만 추출하는 함수
//   const extractCurrencyCode = (currency) => {
//     // 공백 또는 괄호 앞부분까지만 추출
//     return currency.split(' ')[1] || currency.split(' ')[0];  // 예: "미국 USD" -> "USD"
//   };

//   // 전날 대비 변동률을 계산하는 함수
//   const calculateUpdownRate = (currency) => {
//     const todayData = worldConsumData.find(data => data.currency === currency && data.referenceDate === "2024-09-11");
//     const yesterdayData = worldConsumData.find(data => data.currency === currency && data.referenceDate === "2024-09-10");

//     if (todayData && yesterdayData) {
//       const todayRate = parseFloat(todayData.baseRate.replace(/,/g, ''));
//       const yesterdayRate = parseFloat(yesterdayData.baseRate.replace(/,/g, ''));
//       return ((todayRate - yesterdayRate) / yesterdayRate * 100).toFixed(2); // 변동률 계산
//     }
//     return null;
//   };

//   // 클릭된 WorldExInfo의 currency에 맞는 ChartCard 활성화
//   const handleWorldExInfoClick = (currency) => {
//     const currencyCode = extractCurrencyCode(currency);  // 통화 코드 추출
//     setSelectedCurrency(currencyCode);  // 선택된 통화 코드로 상태 변경
//   };

//   return (
//     <>
//       <div className='w-[1140px] h-[calc(100vh-80px)] flex flex-col py-10 px-10'>
//         <Text className='font-semibold' fontSize='xl'>01</Text>
//         <div className='flex items-center'>
//           <Text className='font-semibold mr-2' fontSize='3xl'>오늘의 환율</Text>
//           <Image className='h-[32px] w-[32px]' src='./image/mainpageicon.png'></Image>
//         </div>
//         <Text fontSize='xl'>한 눈에 오늘의 환율 정보를 확인해 보세요.</Text>
//         <div className='w-full flex-grow py-5'>
//           <div name="chart-box" className='flex justify-center gap-4'>
//             {consumData
//               .filter((data) => data.name === selectedCurrency)  // 선택된 통화의 ChartCard만 출력
//               .map((data, index) => (
//                 <ChartCard 
//                   key={index}
//                   index={data.index}
//                   name={data.name}
//                   imageUrl={data.imageUrl}
//                   currentPrice={data.currentPrice}
//                   increase={data.increase}
//                   date={data.date}
//                   chartData={data.chartData}            
//                 />
//               ))}
//           </div>
//           <FlowText />
          
//           <Text className='font-semibold mr-2 mt-20 mb-10' fontSize='3xl'>세계환율정보</Text>
//           <div className='w-full text-center flex'>
//             <Text className='w-[20%]'>통화명</Text>
//             <Text className='w-[20%]'>매매기준율</Text>
//             <Text className='w-[20%]'>보내실 때</Text>
//             <Text className='w-[20%]'>받으실때</Text>
//             <Text className='w-[20%]'>비교</Text>
//           </div>
//           <div className='border my-2'></div>

//           {worldConsumData
//             .filter(data => data.referenceDate === "2024-09-11") // 오늘 날짜 데이터만 표시
//             .map((data, index) => {
//               const updownRate = calculateUpdownRate(data.currency); // 변동률 계산
//               return (
//                 <div key={index} onClick={() => handleWorldExInfoClick(data.currency)}>
//                   <WorldExInfo 
//                     currency={data.currency}
//                     baseRate={data.baseRate}
//                     remitSend={data.remitSend}
//                     remitReceive={data.remitReceive}
//                     updownRate={updownRate}
//                   />
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MainPage;
import React, { useEffect, useState } from 'react';
import { Text, Image } from '@chakra-ui/react';
import ChartCard from '../components/ChartCard';
import FlowText from '../components/FlowText';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaRegStar } from "react-icons/fa";
import { IoMdArrowDropup } from "react-icons/io";
import WorldExInfo from '../components/WorldExInfo';

const MainPage = () => {
  const [consumData, setConsumData] = useState([]);
  const [worldConsumData, setWorldConsumData] = useState([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState(['USD']);  // 초기값은 'USD' 포함
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const getUseHistory = async () => {
      try {
        const result = await axios.get("http://localhost:8081/api/mainpage");
        const result2 = await axios.get("http://localhost:8081/api/mainpage/worldtable");
        setConsumData(result.data.data);
        setWorldConsumData(result2.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUseHistory();
  }, []);

  // currency에서 실제 통화 코드만 추출하는 함수
  const extractCurrencyCode = (currency) => {
    // 공백 또는 괄호 앞부분까지만 추출
    return currency.split(' ')[1] || currency.split(' ')[0];  // 예: "미국 USD" -> "USD"
  };

  // 전날 대비 변동률을 계산하는 함수
  const calculateUpdownRate = (currency) => {
    const todayData = worldConsumData.find(data => data.currency === currency && data.referenceDate === "2024-09-11");
    const yesterdayData = worldConsumData.find(data => data.currency === currency && data.referenceDate === "2024-09-10");

    if (todayData && yesterdayData) {
      const todayRate = parseFloat(todayData.baseRate.replace(/,/g, ''));
      const yesterdayRate = parseFloat(yesterdayData.baseRate.replace(/,/g, ''));
      return ((todayRate - yesterdayRate) / yesterdayRate * 100).toFixed(2); // 변동률 계산
    }
    return null;
  };

  // 클릭된 WorldExInfo의 currency를 selectedCurrencies에 추가
  const handleWorldExInfoClick = (currency) => {
    const currencyCode = extractCurrencyCode(currency);  // 통화 코드 추출
    // 중복된 통화 코드가 없으면 배열에 추가
    if (!selectedCurrencies.includes(currencyCode)) {
      setSelectedCurrencies((prevCurrencies) => [...prevCurrencies, currencyCode]);
    }
  };

  return (
    <>
      <div className='w-[1140px] h-[calc(100vh-80px)] flex flex-col py-10 px-10'>
        <Text className='font-semibold' fontSize='xl'>01</Text>
        <div className='flex items-center'>
          <Text className='font-semibold mr-2' fontSize='3xl'>오늘의 환율</Text>
          <Image className='h-[32px] w-[32px]' src='./image/mainpageicon.png'></Image>
        </div>
        <Text fontSize='xl'>한 눈에 오늘의 환율 정보를 확인해 보세요.</Text>
        <div className='w-full flex-grow py-5'>
          <div name="chart-box" className='flex justify-center gap-4'>
            {consumData
              .filter((data) => selectedCurrencies.includes(data.name))  // 선택된 모든 통화의 ChartCard 출력
              .map((data, index) => (
                <ChartCard 
                  key={index}
                  index={data.index}
                  name={data.name}
                  imageUrl={data.imageUrl}
                  currentPrice={data.currentPrice}
                  increase={data.increase}
                  date={data.date}
                  chartData={data.chartData}            
                />
              ))}
          </div>
          <FlowText />
          
          <Text className='font-semibold mr-2 mt-20 mb-10' fontSize='3xl'>세계환율정보</Text>
          <div className='w-full text-center flex'>
            <Text className='w-[20%]'>통화명</Text>
            <Text className='w-[20%]'>매매기준율</Text>
            <Text className='w-[20%]'>보내실 때</Text>
            <Text className='w-[20%]'>받으실때</Text>
            <Text className='w-[20%]'>비교</Text>
          </div>
          <div className='border my-2'></div>

          {worldConsumData
            .filter(data => data.referenceDate === "2024-09-11") // 오늘 날짜 데이터만 표시
            .map((data, index) => {
              const updownRate = calculateUpdownRate(data.currency); // 변동률 계산
              return (
                <div key={index} onClick={() => handleWorldExInfoClick(data.currency)}>
                  <WorldExInfo 
                    currency={data.currency}
                    baseRate={data.baseRate}
                    remitSend={data.remitSend}
                    remitReceive={data.remitReceive}
                    updownRate={updownRate}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MainPage;
