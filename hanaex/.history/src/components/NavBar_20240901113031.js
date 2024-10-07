import React from 'react'
import Menu from './Menu'
import { IoPersonCircle } from "react-icons/io5";
import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='w-[1140px] h-[55px] bg-slate-200'>
      <div name="nav-container" className='w-full h-full py-6 flex items-center justify-between p-3'>
        <div name='logobox' className='flex gap-1'>
        <Box className='w-[24px] h-[24px]'>
          <Image src="/image/hana_logo.png" alt='flag' />
        </Box>
          <Text name='title'>HanaEx</Text>
        </div>
        <div name='menus'className='h-full flex items-center gap-5'>
          <Link to={"/"}><Menu menu_name="오늘의 환율"/></Link>
          <Link to={"/News"}><Menu menu_name="오늘의 뉴스"/></Link>
          <Link to={"/Semantic"}><Menu menu_name="오늘의 온도"/></Link>
          <Link to={"/Board"}><Menu menu_name="게시판"/></Link>
        </div>
        <Link to={"/My"}>
          <IoPersonCircle className='w-8 h-8'/>
        </Link>
      </div>
    </nav> 
  )
}

export default NavBar
