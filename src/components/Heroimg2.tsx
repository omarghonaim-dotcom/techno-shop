import Image from 'next/image'
import React from 'react'

export default function Heroimg2() {
  return (
    <div className='flex justify-center my-10'>
        <Image
            src="/images/frame.png"
            alt='hero'
            width={1400}
            height={700}
        >

        </Image>
    </div>
  )
}
