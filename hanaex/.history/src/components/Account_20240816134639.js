import React from 'react'
import { Text, Image } from "@chakra-ui/react";

const Account = () => {
  return (
    <div className='flex justify-between items-center py-2 bg-slate-300'>
      <div name='img-name' className='flex'>
        <Image src=''/>
        <Text className='text-lg leading-0 font-medium'>하나 빌리언달러 통장</Text>
      </div>
      <div className='px-3 mt-2 bg-slate-100 rounded-sm'>
        <Text>자세히보기</Text>
      </div>
    </div>
  )
}

export default Account
