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
    <div className="w-[960px] h-full flex py-1 px-10 mt-10">
      <div className='w-72 bg-slate-200'>
        <Image src='/image/board_image.png'/>
        <Text className='text-xl mb-1'>원달러 투자자들 모여라</Text>
        <Text className='text-sm'>831명 활동중</Text>
      </div>
      <div name="container" className='w-full px-2'>
        <BoardInput onPost={handlePost} />
        {boards.map((board, index) => (
          <NewBoard key={index} boardtext={board.content} boardImage={board.image} />
        ))}
      </div>
    </div>
  );
};

export default BoardPageDetail;
