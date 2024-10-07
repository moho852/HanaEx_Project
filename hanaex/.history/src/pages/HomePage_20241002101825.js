import React from 'react'

const HomePage = () => {
  return (
    <div className='relative'>
      <img className='fixed w-full h-screen' src={process.env.PUBLIC_URL + "/image/homepage_bg.jpg"} alt="" />
      <div className='fixed w-full h-screen bg-black opacity-65'></div>
    </div>
  )
}

export default HomePage
