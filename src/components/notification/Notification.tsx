// pages/index.js or app/page.js depending on your Next.js version
import { useState } from 'react';
import NotificationPanel from '../components/NotificationPanel';

export default function Notification() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <input 
              type="text" 
              placeholder="Search" 
              className="border rounded-md px-3 py-2 w-64"
            />
            <button className="text-gray-500 hover:text-gray-700">
              Advanced ▼
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 h-2 w-2 bg-orange-500 rounded-full"></span>
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="border-b pb-4 mb-4">
            <div className="flex space-x-4">
              <button className="px-4 py-2 font-medium border-b-2 border-black">Draft</button>
              <button className="px-4 py-2 text-gray-500">Preview</button>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <p>Hey @Anna Sosnovich</p>
            <p>
              Once you have a viable prototype (whether this is for a website, mobile app, or 
              another digital product) you need to put it to the 
              <a href="#" className="text-blue-600"> the test</a>.
            </p>
            <p>
              You can <span className="underline">understand where the user is confused</span> and what 
              they struggle with. The feedback you gain will inform the next stage of the 
              development process, highlighting areas that need attention.
            </p>
          </div>
        </div>
      </div>

      {showNotifications && <NotificationPanel />}
    </div>
  );
}