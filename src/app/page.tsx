"use client"

import React from 'react'

const page = () => {
    React.useEffect(() => {
        window.location.replace('/login');
    }, []);

  return (
    <div></div>
  )
}
export default page