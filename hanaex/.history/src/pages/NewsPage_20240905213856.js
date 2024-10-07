import React, { useEffect, useState } from 'react'
import { Text } from '@chakra-ui/react'
import NewsCard from '../components/NewsCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import axios from 'axios'

import "swiper/css";
import '../css/style.css';
import 'swiper/css/pagination';

import ToggleSwitch from '../components/Toggle';

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
    }
    getUseHistory();
  }, [])
  // 토글이 눌렸을 때 selected를 false로 변경
  const handleToggle = () => {
    setSelected(!selected);
  };

  function truncateText(text, maxLength = 60) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  // selected 값에 따라 데이터를 필터링
  const filteredData = consumData.filter(data => {
    return selected ? data.result === "호재" : data.result === "악재";
  });

  if (!isLoading) return <div>로딩중입니다.</div>

  return (
    <>
      <div className='w-[1140px] h-[calc(100vh-80px)] flex flex-col py-10 px-10'>
        <Text className='font-semibold mr-2' fontSize='xl'>02</Text>
        <Text className='font-semibold mr-2' fontSize='3xl'>오늘의 환율 소식</Text>
        <Text fontSize='xl'>외환 전문 AI를 통해 글로벌 외환 소식을 쉽게 접해보세요.</Text>
        
        <Swiper
          slidesPerView={3}
          spaceBetween={15}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {filteredData.map((data, index) => (
            <SwiperSlide>
              <NewsCard
                key={index}
                url={data.url}
                state={data.state}
                title={data.title}
                content={ truncateText(data.content) }
                image_url={ data.imageUrl }
                result={ data.result }
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <ToggleSwitch selected={selected} handleToggle={ handleToggle } direction={'center'}/>
      </div>
    </>
  )
}

export default NewsPage
