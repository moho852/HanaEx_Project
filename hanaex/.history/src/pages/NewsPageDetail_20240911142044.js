// // import React, { useState, useEffect } from "react";
// // import { Heading, Image, Text } from "@chakra-ui/react";
// // import NewsBar from "../components/NewsBar";
// // import { useParams } from "react-router-dom";
// // import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
// // import TitleText from "../components/TitleText";
// // import axios from "axios";

// // const NewsPageDetail = () => {
// //   const [consumData, setConsumData] = useState([]);
// //   const [newsConsumData, setNewsConsumData] = useState([]);
// //   const [gpttext, setGptText] = useState(false);
// //   const [fulltext, setFulltext] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const { id } = useParams();
// //   // console.log( id )

// //   useEffect(() => {
// //     const getUseHistory = async () => {
// //       const encodedUrl = encodeURIComponent(id);
// //       try {
// //         const result = await axios.get(
// //           `http://localhost:8081/api/news/detail?url=${encodedUrl}`
// //         );
// //         // console.log(result.data.data);
// //         setConsumData(result.data.data);

// //         const state = result.data.data.state;
// //         // console.log(state);
// //         if (state) {
// //           const result2 = await axios.get(
// //             `http://localhost:8081/api/news/state?state=${state}`
// //           );
// //           // console.log(result2.data.data);
// //           setNewsConsumData(result2.data.data); // Store the result of the second call
// //         }
// //       } catch (error) {
// //         console.log(error);
// //       } finally {
// //         setIsLoading(true);
// //       }
// //     };
// //     getUseHistory();
// //   }, []);

// //   const handleGpttext = () => {
// //     setGptText(!gpttext);
// //   };

// //   const handleFulltext = () => {
// //     setFulltext(!fulltext);
// //   };
// //   function truncateText(text, maxLength = 500) {
// //     if (text.length > maxLength) {
// //       return text.slice(0, maxLength) + "...";
// //     }
// //     return text;
// //   }

// //   if (!isLoading) return <div>로딩중입니다.</div>;

// //   return (
// //     <div className="w-[960px] bg-slate-500 flex flex-col py-1 px-10 mt-10">
// //       {/* 헤더라인 */}
// //       <div className="bg-slate-200 mb-4">
// //         <Heading size={"lg"}>{consumData.title}</Heading>
// //         <Text size={"sm"} className="text-slate-700">
// //           2024년 8월 12일 07:58
// //         </Text>
// //       </div>
// //       <div className="bg-white mb-4">
// //         <div className="flex">
// //           <p className="font-semibold">ChatGPT</p>
// //           <Image boxSize={"24px"} src="/image/chat-bot.png"></Image>
// //         </div>

// //         <span>
// //           이 기사를{" "}
// //           <span className="font-semibold text-red-500">
// //             {consumData.result}
// //           </span>
// //           로 분석했어요
// //         </span>
// //       </div>
// //       {/* 요약box */}
// //       <div name="gpt-box" className="bg-slate-200 px-6 py-4 rounded-2xl mb-4">
// //         {gpttext === true ? (
// //           <Text>{consumData.news_summary}</Text>
// //         ) : (
// //           <Text>{truncateText(consumData.news_summary, 100)}</Text>
// //         )}
// //         {/* 자세히 보기 box */}
// //         <div className="flex justify-center items-center mt-2">
// //           <Text
// //             name="show-gpttext"
// //             className="text-slate-700"
// //             onClick={handleGpttext}
// //           >
// //             자세히보기
// //           </Text>
// //           {gpttext === true ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
// //         </div>
// //       </div>
// //       {/* 뉴스 내용 box */}
// //       <div
// //         name="content-box"
// //         className="flex flex-col items-center bg-slate-100 rounded-2xl px-10 py-4"
// //       >
// //         <Image
// //           src={consumData.imageUrl}
// //           className="w-[750px] h-[250px]"
// //         ></Image>
// //         <div className="my-6">
// //           {fulltext === true ? (
// //             <Text name="full-text">{consumData.content}</Text>
// //           ) : (
// //             <Text name="summary-text">{truncateText(consumData.content)}</Text>
// //           )}
// //         </div>
// //         <div className="flex items-center">
// //           <Text name="show-fulltext" onClick={handleFulltext}>
// //             자세히보기
// //           </Text>
// //           {fulltext === true ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
// //         </div>
// //       </div>
// //       <TitleText title="관련뉴스" />
// //       {newsConsumData.map((data, index) => (
// //         <NewsBar
// //           key={index}
// //           state={data.state}
// //           result={data.result}
// //           url={data.url}
// //           title={data.title}
// //           content={data.content}
// //           imageUrl={data.imageUrl}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // export default NewsPageDetail;

// import React, { useState, useEffect } from "react";
// import { Heading, Image, Text } from "@chakra-ui/react";
// import NewsBar from "../components/NewsBar";
// import { useParams } from "react-router-dom";
// import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
// import TitleText from "../components/TitleText";
// import axios from "axios";

// const NewsPageDetail = () => {
//   const [consumData, setConsumData] = useState([]);
//   const [newsConsumData, setNewsConsumData] = useState([]);
//   const [gpttext, setGptText] = useState(false);
//   const [fulltext, setFulltext] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { id } = useParams();

//   useEffect(() => {
//     const getUseHistory = async () => {
//       const encodedUrl = encodeURIComponent(id);
//       try {
//         const result = await axios.get(
//           `http://localhost:8081/api/news/detail?url=${encodedUrl}`
//         );
//         setConsumData(result.data.data);

//         const state = result.data.data.state;
//         if (state) {
//           const result2 = await axios.get(
//             `http://localhost:8081/api/news/state?state=${state}`
//           );
//           setNewsConsumData(result2.data.data);
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsLoading(true);
//       }
//     };
//     getUseHistory();
//   }, []);

//   const handleGpttext = () => {
//     setGptText(!gpttext);
//   };

//   const handleFulltext = () => {
//     setFulltext(!fulltext);
//   };

//   // 단락을 줄바꿈 기준으로 나누는 함수
//   function splitParagraphs(text) {
//     if (!text) return [];
//     return text.split("\n").filter(paragraph => paragraph.trim() !== "");
//   }

//   function truncateText(text, maxLength = 500) {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + "...";
//     }
//     return text;
//   }

//   if (!isLoading) return <div>로딩중입니다.</div>;

//   return (
//     <div className="w-[960px] flex flex-col py-1 px-10 mt-10">
//       {/* 헤더라인 */}
//       <div className="mb-4">
//         <Heading size={"lg"}>{consumData.title}</Heading>
//         <Text size={"sm"} className="text-slate-700">
//           2024년 8월 12일 07:58
//         </Text>
//       </div>
//       <div className="mb-4">
//         <div className="flex">
//           <p className="font-semibold">ChatGPT</p>
//           <Image boxSize={"24px"} src="/image/chat-bot.png"></Image>
//         </div>

//         <span>
//           이 기사를{" "}
//           <span className="font-semibold text-red-500">
//             {consumData.result}
//           </span>
//           로 분석했어요
//         </span>
//       </div>
//       {/* 요약box */}
//       <div name="gpt-box" className="bg-[#EAF2EF] px-6 py-4 rounded-2xl mb-4">
//         {gpttext === true ? (
//           <Text>{consumData.news_summary}</Text>
//         ) : (
//           <Text>{truncateText(consumData.news_summary, 100)}</Text>
//         )}
//         {/* 자세히 보기 box */}
//         <div className="flex justify-center items-center mt-2">
//           <Text
//             name="show-gpttext"
//             className="text-slate-700"
//             onClick={handleGpttext}
//           >
//             자세히보기
//           </Text>
//           {gpttext === true ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
//         </div>
//       </div>
//       {/* 뉴스 내용 box */}
//       <div
//         name="content-box"
//         className="flex flex-col items-center bg-slate-200 rounded-2xl px-10 py-4"
//       >
//         <Image
//           src={consumData.imageUrl}
//           className="w-[750px] h-[250px]"
//         ></Image>
//         <div className="my-6">
//           {fulltext === true
//             ? splitParagraphs(consumData.content).map((paragraph, index) => (
//                 <Text key={index} name="full-text" mb={4}>
//                   {paragraph}
//                 </Text>
//               ))
//             : splitParagraphs(truncateText(consumData.content)).map((paragraph, index) => (
//                 <Text key={index} name="summary-text" mb={4}>
//                   {paragraph}
//                 </Text>
//               ))}
//         </div>
//         <div className="flex items-center">
//           <Text name="show-fulltext" onClick={handleFulltext}>
//             자세히보기
//           </Text>
//           {fulltext === true ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
//         </div>
//       </div>
//       <TitleText title="관련뉴스" />
//       {newsConsumData.map((data, index) => (
//         <NewsBar
//           key={index}
//           state={data.state}
//           result={data.result}
//           url={data.url}
//           title={data.title}
//           content={data.content}
//           imageUrl={data.imageUrl}
//         />
//       ))}
//     </div>
//   );
// };

// export default NewsPageDetail;


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
  }, []);

  const handleGpttext = () => {
    setGptText(!gpttext);
  };

  const handleFulltext = () => {
    setFulltext(!fulltext);
  };

  // 단락을 줄바꿈 기준으로 나누는 함수
  function splitParagraphs(text) {
    if (!text) return [];
    return text.split("\n").filter(paragraph => paragraph.trim() !== "");
  }

  // 텍스트를 일정 길이로 자르는 함수
  function truncateText(text, maxLength = 500) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

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
          <p className="font-semibold">ChatGPT</p>
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
        className="flex flex-col items-center bg-slate-200 rounded-2xl px-10 py-4"
      >
        <Image
          src={consumData.imageUrl}
          className="w-[750px] h-[250px] object-contain"
        ></Image>
        <div className="my-6">
          {fulltext === true
            ? splitParagraphs(consumData.content).map((paragraph, index) => (
                <Text key={index} name="full-text" mb={4}>
                  {paragraph}
                </Text>
              ))
            : splitParagraphs(truncateText(consumData.content)).map((paragraph, index) => (
                <Text key={index} name="summary-text" mb={4}>
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
