"use client"
import PostView from '@/components/homePage/middle/postPreview/PostView'
import Navbar from '@/components/navBar/Navbar'
import { useParams } from 'next/navigation';

import React from 'react'

function Page() {
    const params = useParams();
  const id = params.id as string;
  return (
    <div>
        <Navbar/>
        <PostView  postId={id as string}/>
        </div>
  )
}

export default Page