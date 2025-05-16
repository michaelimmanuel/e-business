"use client"
import React from 'react'
import Image from 'next/image'

const page = () => {
    const handleOnclick = () => {
        // go to /home
        window.location.href = '/home'
    }

  return (
    <div>
        <div className='relative w-full max-w-xl aspect-[16/9]'>
            <Image
                src="/images/login-hero.png"
                alt="Login"
                width={500}
                height={500}
                className="bg-bg"
            />
        <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
        </div>
        <div className="absolute flex flex-col items-center justify-center text-center z-20 px-4">
            <h1 className="text-4xl font-bold text-white">Welcome Back!</h1>
            <div className="mt-10 text-white">
                <button 
                    className="mt-4 px-6 py-2 bg-white text-black rounded-lg w-3/4 font-bold"
                    onClick={handleOnclick}
                >
                    Continue with Google
                </button>
                <button  
                    className="mt-4 px-6 py-2 bg-white text-black rounded-lg w-3/4 font-bold"
                    onClick={handleOnclick}
                >
                    Continue with Facebook
                </button>
                <button  
                    className="mt-4 px-6 py-2 bg-white text-black rounded-lg w-3/4 font-bold"
                    onClick={handleOnclick}
                >
                    Continue with Apple
                </button>
                <p className='mt-4'>
                  Don't Have Account?{' '}
                  <a href="/register" className="underline text-white">
                    Register
                  </a>
                </p>
            </div>
        </div>
    </div>
  )
}

export default page