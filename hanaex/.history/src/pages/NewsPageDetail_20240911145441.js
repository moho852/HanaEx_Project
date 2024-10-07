import React, { useState, useEffect } from "react";
import { Heading, Image, Text } from "@chakra-ui/react";
import NewsBar from "../components/NewsBar";
import { useParams } from "react-router-dom";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import TitleText from "../components/TitleText";
import axios from "axios";

const NewsPageDetail = () => {
  const [consumData, setConsumData] = useState([]);
  const [newsConsumData, setNewsConsumData] = useState([]);
  const [gpttext, setGptText] = useState(false);
  const [fulltext, setFulltext] = useState(false);
  const [paragraphs, setParagraphs] = useState([]); // 텍스트를 미리 나눈 단락 저장
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getUseHistory = async () => {
      const encodedUrl = encodeURIComponent(id);
      try {
        const result = await axios.get(
          `http://localhost:8081/api/news/detail?url=${encodedUrl}`
        );
        setConsumData(result.data.data);

        // 새로운 문장 단락 나누기 로직 적용
        const splitContent = splitByPunctuation(result.data.data.content);
        setParagraphs(splitContent);
        console.log(result.data.data)
        const state = result.data.data.state;
        if (state) {
          const result2 = await axios.get(
            `http://localhost:8081/api/news/state?state=${state}`
          );
          setNewsConsumData(result2.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(true);
      }
    };
    getUseHistory();
  }, [id]);

  const handleGpttext = () => {
    setGptText(!gpttext);
  };

  const handleFulltext = () => {
    setFulltext(!fulltext);
  };

  // 문장 부호를 기준으로 단락을 나누는 함수
  function splitByPunctuation(text) {
    if (!text) return [];
    return text.split(/(?<=[.?!])\s+/).filter(paragraph => paragraph.trim() !== "");
  }

  // 텍스트를 일정 길이로 자르는 함수
  function truncateText(text, maxLength = 500) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  console.log(paragraphs)
  console.log(newsConsumData)

  if (!isLoading) return <div>로딩중입니다.</div>;

  return (
    <div className="w-[960px] flex flex-col py-1 px-10 mt-10">
      {/* 헤더라인 */}
      <div className="mb-4">
        <Heading size={"lg"}>{consumData.title}</Heading>
        <Text size={"sm"} className="text-slate-700">
          2024년 8월 12일 07:58
        </Text>
      </div>
      <div className="mb-4">
        <div className="flex">
          <p className="font-semibold text-xl">ChatGPT</p>
          <Image boxSize={"24px"} src="/image/chat-bot.png"></Image>
        </div>

        <span>
          이 기사를{" "}
          <span className="font-semibold text-red-500">
            {consumData.result}
          </span>
          로 분석했어요
        </span>
      </div>
      {/* 요약box */}
      <div name="gpt-box" className="bg-[#EAF2EF] px-6 py-4 rounded-2xl mb-4">
        {gpttext === true ? (
          <Text>{consumData.news_summary}</Text>
        ) : (
          <Text>{truncateText(consumData.news_summary, 100)}</Text>
        )}
        {/* 자세히 보기 box */}
        <div className="flex justify-center items-center mt-2">
          <Text
            name="show-gpttext"
            className="text-slate-700"
            onClick={handleGpttext}
          >
            자세히보기
          </Text>
          {gpttext === true ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>
      </div>
      {/* 뉴스 내용 box */}
      <div
        name="content-box"
        className="flex flex-col items-center bg-slate-100 rounded-2xl px-10 py-4"
      >
        <Image
          src={consumData.imageUrl}
          className="w-[750px] h-[300px] object-contain bg-white rounded-xl"
        ></Image>
        <div className="my-6">
          {fulltext === true
            ? paragraphs.map((paragraph, index) => (
                <Text key={index} className="chakra-text css-rszk63 font-semibold" name="full-text" style={{ marginBottom: '1.5rem' }}>
                  {paragraph}
                </Text>
              ))
            : splitByPunctuation(truncateText(consumData.content)).map((paragraph, index) => (
                <Text key={index} className="chakra-text css-rszk63 font-semibold" name="summary-text" style={{ marginBottom: '1.5rem' }}>
                  {paragraph}
                </Text>
              ))}
        </div>
        <div className="flex items-center">
          <Text name="show-fulltext" onClick={handleFulltext}>
            자세히보기
          </Text>
          {fulltext === true ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>
      </div>
      <TitleText title="관련뉴스" />
      {newsConsumData.map((data, index) => (
        <NewsBar
          key={index}
          state={data.state}
          result={data.result}
          url={data.url}
          title={data.title}
          content={data.content}
          imageUrl={data.imageUrl}
        />
      ))}
    </div>
  );
};

export default NewsPageDetail;
