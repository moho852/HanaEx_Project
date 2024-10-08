import React, {useEffect, useState} from 'react'
import { Text, Image } from '@chakra-ui/react'
import ChartCard from '../components/ChartCard'
import FlowText from '../components/FlowText'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { FaRegStar } from "react-icons/fa";
import { IoMdArrowDropup } from "react-icons/io";
import WorldExInfo from '../components/WorldExInfo'


const MainPage = () => {
  const [consumData, setConsumData] = useState([]);
  const [worldConsumData, setWorldConsumData] = useState([]);
  const user = useSelector((state) => state.user.user);
  console.log("main : ", user)
  useEffect(() => {
    const getUseHistory = async () => {
      try {
        const result = await axios.get("http://localhost:8081/api/mainpage");
        const result2 = await axios.get("http://localhost:8081/api/mainpage/worldtable");
        setConsumData(result.data.data);
        setWorldConsumData(result2.data.data);
        console.log(result.data.data);
        console.log(result2.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUseHistory();
  }, [])

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
          {consumData.map((data, index) => (
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

        <WorldExInfo />

      </div>
      
    </div>
    </>
  )
}

export default MainPage
