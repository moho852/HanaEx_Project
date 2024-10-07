import React from 'react'
import { Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const NewsCard = ({ state, url, title, content, image_url, result }) => {
  return (
    <Link to={"/NewsPageDetail/" + encodeURIComponent(url)} name="card-container" className='w-[300px] h-[310px] bg-white px-6 py-5 rounded-2xl drop-shadow-2xl'>
      <Text>1</Text>
      <img src= { image_url } alt='News Image'  className='object-cover rounded-2xl w-full h-[140px]'/>
      <div name="text-box" className='flex flex-col items-center'>
        <Text lineHeight={1} className='text-lg leading-0 font-semibold grow py-2'>
          { title }
        </Text>
        <Text fontSize={'sm'} lineHeight={1} className='h-[42px] grow text-center text-slate-600'>
          { content }
        </Text>
        <Text fontSize={'xl'} as={'b'} className='grow'>
          { result }
        </Text>
      </div>
    </Link>
  )
}

export default NewsCard
