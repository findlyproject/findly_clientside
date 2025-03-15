import { useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Collection() {
    const activeuser=useAppSelector((state)=>state.user.activeuser)
    const routes=activeuser?'user':'company'
    console.log("routes",routes);
    
    const route=useRouter()

    const features = [
        { 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          ),
          text: 'Saved items' ,
           path:`/${routes}/posts?name=saved`
        },
        { 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          text: 'Liked posts' ,
           path:`/${routes}/posts?name=liked`
        },
        { 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
          text: 'my posts' ,
           path:`/${routes}/posts?name=posts`
        },
        activeuser
    ?  {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      text: "Applied Jobs",
      path: `/${routes}/appliedjobs`,
    }
    :{
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        ),
        text: "Jobs",
        path: `/${routes}/posts/jobs`,
      },
      ];
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 top-10 ">
<div className="space-y-3">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
            onClick={()=>route.push(`${feature.path}`)}
          >
            <div className="text-gray-600">{feature.icon}</div>
            <span className="text-gray-700">{feature.text}</span>
          </div>
        ))}
      </div> </div>
  )
}
