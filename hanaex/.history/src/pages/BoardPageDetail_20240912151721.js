// BoardPageDetail.js
import React, { useState } from "react";
import BoardInput from "../components/BoardInput";
import { Image, Text } from '@chakra-ui/react';
import NewBoard from "../components/NewBoard";

const BoardPageDetail = () => {
  const [boards, setBoards] = useState([]);

  const handlePost = (newBoard) => {
    setBoards((prevBoards) => [...prevBoards, newBoard]);
  };

  return (
    <div className="w-[960px] flex py-1 px-10 mt-10">
      <div className='w-72 mr-6'>
        <Image src='/image/board_image.png'/>
        <Text className='text-xl mb-1'>원달러 투자자들 모여라</Text>
        <Text className='text-sm'>831명 활동중</Text>
      </div>
      <div name="container" className='w-full px-2 bg-white rounded-lg' style={{boxShadow: "0 2px 11px rgba(0, 0, 0, 0.1)"}}>
        <BoardInput onPost={handlePost} />
        {boards.map((board, index) => (
          <NewBoard key={index} boardtext={board.content} boardImage={board.image} />
        ))}
      </div>
    </div>
  );
};

export default BoardPageDetail;
