// import React, { useEffect, useState } from "react";
// import { Text, Image } from "@chakra-ui/react";
// import NewsCard from "../components/NewsCard";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import axios from "axios";
// import styled from 'styled-components';
// import "swiper/css";
// import "../css/style.css";
// import "swiper/css/pagination";

// import ToggleSwitch from "../components/Toggle";

// const NewsPage = () => {
//   const [consumData, setConsumData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selected, setSelected] = useState(true);

//   useEffect(() => {
//     const getUseHistory = async () => {
//       try {
//         const result = await axios.get("http://localhost:8081/api/news");
//         console.log(result.data);
//         setConsumData(result.data.data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsLoading(true);
//       }
//     };
//     getUseHistory();
//   }, []);
//   // 토글이 눌렸을 때 selected를 false로 변경
//   const handleToggle = () => {
//     setSelected(!selected);
//   };

//   function truncateText(text, maxLength = 60) {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + "...";
//     }
//     return text;
//   }

//   // selected 값에 따라 데이터를 필터링
//   const filteredData = consumData.filter((data) => {
//     return selected ? data.result === "호재" : data.result === "악재";
//   });

//   if (!isLoading) return <div>로딩중입니다.</div>;

//   return (
//     <>
//       <div className="w-[1140px] h-[calc(100vh-80px)] flex flex-col py-10 px-10">
//         <Text className="font-semibold mr-2" fontSize="xl">
//           02
//         </Text>
//         <div className="flex items-center">
//           <Text className="font-semibold mr-2" fontSize="3xl">
//             오늘의 환율 소식
//           </Text>
//           <Image
//             className="h-[32px] w-[32px]"
//             src="./image/news2_imoji.png"
//           ></Image>
//         </div>
//         <Text fontSize="xl">
//           외환 전문 AI를 통해 글로벌 외환 소식을 쉽게 접해보세요.
//         </Text>

//         <Swiper
//           slidesPerView={3}
//           spaceBetween={20}
//           pagination={{
//             clickable: true,
//           }}
//           style={{ width: '1100px', padding:"10px" }}
//           modules={[Pagination]}
//           className="mySwiper"
//         >
//           {filteredData.map((data, index) => (
//             <SwiperSlide
//               style={{
//                 width: "250px",
//                 height: "310px",
//                 boxShadow: "0 3px 13px rgba(0, 0, 0, 0.2)", // drop-shadow 추가
//                 borderRadius: "15px", // rounded 효과 추가 (15px로 설정)
//                 padding: "20px",
//               }}
//             >
//               <NewsCard
//                 key={index}
//                 url={data.url}
//                 state={data.state}
//                 title={data.title}
//                 content={truncateText(data.content)}
//                 image_url={data.imageUrl}
//                 result={data.result}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         <ToggleSwitch
//           selected={selected}
//           handleToggle={handleToggle}
//           direction={"center"}
//         />
//       </div>
//     </>
//   );
// };

// export default NewsPage;

// // styled-components로 Swiper Pagination 스타일 생성
// const SwiperContainer = styled.div`
//   .swiper-pagination {
//     position: relative;
//     bottom: -20px; /* 원하는 위치로 변경 */
//     text-align: center;
//   }

//   .swiper-pagination-bullet {
//     background: white; /* 기본 색상 설정 */
//     opacity: 0.7;
//     &.swiper-pagination-bullet-active {
//       background: #ff0000; /* 활성화된 페이지네이션 색상 변경 */
//     }
//   }
// `;

import React, { useEffect, useState } from "react";
import { Text, Image } from "@chakra-ui/react";
import NewsCard from "../components/NewsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import axios from "axios";
import styled from "styled-components";  // styled-components 임포트

import "swiper/css";
import "../css/style.css";
import "swiper/css/pagination";

import ToggleSwitch from "../components/Toggle";

// styled-components로 Swiper Pagination 스타일 생성
const SwiperContainer = styled.div`
  .swiper-pagination {
    position: relative;
    bottom: -30px; /* 원하는 위치로 변경 */
    text-align: center;
  }

  .swiper-pagination-bullet {
    background: white; /* 기본 색상 설정 */
    opacity: 0.7;
    &.swiper-pagination-bullet-active {
      background: #ff0000; /* 활성화된 페이지네이션 색상 변경 */
    }
  }
`;

const NewsPage = () => {
  const [consumData, setConsumData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(true);

  useEffect(() => {
    const getUseHistory = async () => {
      try {
        const result = await axios.get("http://localhost:8081/api/news");
        console.log(result.data);
        setConsumData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(true);
      }
    };
    getUseHistory();
  }, []);

  const handleToggle = () => {
    setSelected(!selected);
  };

  function truncateText(text, maxLength = 60) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  const filteredData = consumData.filter((data) => {
    return selected ? data.result === "호재" : data.result === "악재";
  });

  if (!isLoading) return <div>로딩중입니다.</div>;
  
  return (
    <SwiperContainer>  {/* SwiperContainer로 감싸서 pagination 스타일 적용 */}
      <div className="w-[1140px] h-[calc(100vh-80px)] flex flex-col py-10 px-10">
        <Text className="font-semibold mr-2" fontSize="xl">
          02
        </Text>
        <div className="flex items-center">
          <Text className="font-semibold mr-2" fontSize="3xl">
            오늘의 환율 소식
          </Text>
          <Image
            className="h-[32px] w-[32px]"
            src="./image/news2_imoji.png"
          ></Image>
        </div>
        <Text fontSize="xl">
          외환 전문 AI를 통해 글로벌 외환 소식을 쉽게 접해보세요.
        </Text>

        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          style={{ width: '1100px', padding: "10px" }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {filteredData.map((data, index) => (
            <SwiperSlide
              key={index}  // key는 여기에
              style={{
                width: "250px",
                height: "310px",
                boxShadow: "0 3px 13px rgba(0, 0, 0, 0.2)", // drop-shadow 추가
                borderRadius: "15px", // rounded 효과 추가 (15px로 설정)
                padding: "20px",
              }}
            >
              <NewsCard
                url={data.url}
                state={data.state}
                title={data.title}
                content={truncateText(data.content)}
                image_url={data.imageUrl}
                result={data.result}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <ToggleSwitch
          selected={selected}
          handleToggle={handleToggle}
          direction={"center"}
        />
      </div>
    </SwiperContainer>
  );
};

export default NewsPage;
