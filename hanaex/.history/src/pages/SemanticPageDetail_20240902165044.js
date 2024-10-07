import React, { useState, useEffect }from "react";
import { Image, Text } from "@chakra-ui/react";
import ProgressBar from "@ramonak/react-progress-bar";
import WordCloudComponent from '../components/CloudChart';
import axios from 'axios'
import { useParams } from 'react-router';
import NewsBar from '../components/NewsBar';
import TitleText from '../components/TitleText';
import NewsBarChart from '../components/NewsBarChart';

import { imageMapperFunction } from '../data/imageMapper';
import { countryMapperFunction } from '../data/countryMapper';

const SemanticPageDetail = () => {
  const [ consumData, setConsumData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getUseHistory = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/sentiment/detail?state=${id}`);
        setConsumData(result.data.data[0]);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(true);
      }
    }
    getUseHistory();
  }, [])
  if (!isLoading) return <div>로딩중입니다.</div>

  return (
    <>
      <div className="w-[960px] bg-slate-500 flex flex-col py-1 px-10 mt-10">
        {/* 상단 컴포넌트 */}
        <TitleText title="오늘의 온도"/>
        <div className="w-full flex justify-center py-5 rounded-2xl bg-slate-50">
          <div className="flex flex-col">
            {/* inner 상단 box */}
            <div className='flex justify-between'>
              <div className="flex h-[34px] items-center">
                <Text className='font-semibold text-lg mr-1'>{ consumData.state }/KRW</Text>
                <Image className='w-[28px] h-[28px]' src={countryMapperFunction(consumData.state).image} />
              </div>
              <div className="flex flex-col items-center">
                <Image src={imageMapperFunction(consumData.semantic).image} boxSize="180px" alt="smile" />
                <Text className='font-semibold text-2xl'>{ consumData.semantic }</Text>
              </div>
              <div className='p-10'></div>
            </div>
            {/* progressbar */}
            <ProgressBar
              completed={80}
              width="600px"
              height="35px"
              bgColor="#1A6AEB"
              className="pt-3"
            />
            <div className="flex justify-between">
              <div className="flex items-end">
                <Text className='text-xl leading-0 text-red-500'>긍정</Text>
                <Text className='text-2xl font-semibold leading-0 text-red-500'>
                  81.9%
                </Text>
              </div>
              <div className="flex items-end">
                <Text className='text-2xl font-semibold leading-0 text-blue-500'>
                  19.1%
                </Text>
                <Text className='text-xl leading-0 text-blue-500'>부정</Text>
              </div>
            </div>
          </div>
        </div>
        <TitleText title="핫 키워드"/>
        <div className='w-full flex justify-center px-10 rounded-2xl bg-slate-50'>
          <WordCloudComponent />
        </div>
        <TitleText title="언급량" />
        <div className='w-full flex justify-center px-10 py-10 rounded-2xl bg-slate-50'>
          <NewsBarChart />
        </div>
        <TitleText title="관련뉴스"/>
          {/* <NewsBar />
          <NewsBar />
          <NewsBar />
          <NewsBar />
          <NewsBar /> */}
      </div>
    </>
  );
};

export default SemanticPageDetail;
