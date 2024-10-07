import React from 'react'
import { Text, Image } from "@chakra-ui/react";

const Account = () => {
  return (
    <div className='flex justify-between py-2 bg-slate-300'>
      <div name='img-name' className='flex'>
        <Image src=''/>
        <Text>하나 빌리언달러 통장</Text>
      </div>
      <div>
        <Text>자세히보기</Text>
      </div>
    </div>
  )
}

export default Account
