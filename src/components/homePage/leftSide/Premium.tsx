import { useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import React from 'react';

const PremiumFeaturesMenu = () => {
    const {activeuser}=useAppSelector(state=>state.login)
    const routes=activeuser?"user":"company"
    const route=useRouter()
  

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 top-10 ">
      <div className="flex items-center mb-4">
        <h2 className="text-base font-semibold text-gray-800">Grow your business with Premium</h2>
      </div>
      
      <button className="w-full mt-4 bg-yellow-400 text-white py-2 rounded-md hover:bg-yellow-500 transition-colors" onClick={()=>route.push(`/${routes}/premium`)}>
        Try for 30
      </button>
    </div>
  );
};

export default PremiumFeaturesMenu;