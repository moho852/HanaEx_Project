import React, { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import axios from "axios";

import "swiper/css";
import "../css/style.css";
import "swiper/css/pagination";

import ToggleSwitch from "../components/Toggle";
import SementicCard from "../components/SementicCard";

import { imageMapperFunction } from '../data/imageMapper';
import { countryMapperFunction } from '../data/countryMapper';

const SemanticPage = () => {
  const [consumData, setConsumData] = useState([]);
  const [selected, setSelected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    const getUseHistory = async () => {
      try {
        const result = await axios.get("http://localhost:8081/api/sentiment");
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

  // selected 값에 따라 데이터를 필터링
  const filteredData = consumData.filter(data => {
    return selected ? data.semantic === "긍정" : data.semantic === "부정";
  });

  if (!isLoading) return <div>로딩중입니다.</div>;

  return (
    <div className="w-[1140px] h-[calc(100vh-80px)] bg-slate-500 flex py-10 px-10">
      <div className="bg-slate-400 w-[400px]">
        <Text className='font-semibold mr-2' fontSize='xl'>03</Text>
        <Text className='font-semibold mr-2' fontSize='3xl'>오늘의 환율 온도</Text>
        <Text fontSize="xl">AI가 분석한 환율을 보세요.</Text>
        <div className="h-8"></div>
        <ToggleSwitch
          selected={selected}
          handleToggle={handleToggle}
          direction={"start"}
        />
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {filteredData.map((data, index) => (
          <SwiperSlide>
            <SementicCard
              key={index}
              name={data.state}
              imageUrl={countryMapperFunction(data.state).image}
              faceUrl={imageMapperFunction(data.semantic).image}
              semantic={data.semantic}
              persent={data.positive}
              positive={data.positive}
              negative={data.nagative}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SemanticPage;