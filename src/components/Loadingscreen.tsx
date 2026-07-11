import React from 'react'

export default function Loadingscreen() {
  return (
    <video
      className="w-full max-w-xl rounded-xl flex justify-center align-middle"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src="/videos/Live chatbot.mp4" type="video/mp4" />
    </video>
  )
}
