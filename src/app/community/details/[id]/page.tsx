import CommunityDetails from '@/components/common/community/CommunityDetails'
import React from 'react'

export default function page({ params }: { params: { id: string } }) {
  const { id } =  params; 
console.log("idv",id);

  return (
    <div>
        
      <CommunityDetails id={id}/>
    </div>
  )
}


