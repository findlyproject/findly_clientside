import React from 'react'

export default function Notifications() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-start py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Notification Preferences</h1>
      
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Notifications you receive</h2>

        <div className='space-y-6'>
          {/* Connecting with others */}
          <div>
            <div className='flex justify-between items-center mb-2'>
              <h1 className='text-gray-700'>Connecting with others</h1>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 transition-all duration-300">
                  <span className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5`}></span>
                </div>
              </label>
            </div>
            <hr className='border-gray-300' />
          </div>

          {/* Posting and commenting */}
          <div>
            <div className='flex justify-between items-center mb-2'>
              <h1 className='text-gray-700'>Posting and commenting</h1>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 transition-all duration-300">
                  <span className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5`}></span>
                </div>
              </label>
            </div>
            <hr className='border-gray-300' />
          </div>

          {/* Messaging */}
          <div>
            <div className='flex justify-between items-center mb-2'>
              <h1 className='text-gray-700'>Messaging</h1>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 transition-all duration-300">
                  <span className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5`}></span>
                </div>
              </label>
            </div>
            <hr className='border-gray-300' />
          </div>

          {/* Verifications */}
          <div>
            <div className='flex justify-between items-center mb-2'>
              <h1 className='text-gray-700'>Verifications</h1>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 transition-all duration-300">
                  <span className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5`}></span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
