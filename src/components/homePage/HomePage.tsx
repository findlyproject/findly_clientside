import React from "react";

const HomePage = () => {
  return (
    <div className="bg-[#f3f2ef] mt-[85px]">
      <div className="container mx-auto">
        <div className="flex">
          {/* Left Column */}
          <div className="w-1/6">
            <div className="bg-white rounded-lg shadow">
              <div className="relative mb-4 h-14 bg-cover bg-center">
                <img
                  src="/api/placeholder/400/320"
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-white"
                  alt="Profile"
                />
              </div>
              <div className="px-4 pt-8 pb-4">
                <p className="text-center">
                  <a href="#" className="text-gray-900 hover:underline">
                    Dinçer Efe Bolut
                  </a>
                </p>
                <div className="text-center text-gray-500 mb-2">Student</div>
                <hr className="my-2" />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Profile views</span>
                    <span className="text-blue-600">447</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Post views</span>
                    <span className="text-blue-600">150</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex items-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                <span className="ml-2">My Items</span>
              </div>
            </div>

            {/* Pages Section */}
            <div className="bg-white rounded-lg shadow mt-2">
              <div className="p-4">
                <h2 className="text-xl font-medium">My Pages</h2>
                <div className="flex items-center mt-4">
                  <img src="/api/placeholder/400/320" className="w-8 h-8 rounded" alt="Page" />
                  <div className="ml-3">
                    <div className="font-medium text-sm">Harum Necessitatibus</div>
                    <div className="text-sm text-gray-500">
                      Page Notifications
                      <span className="text-blue-600 ml-1">10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Section */}
            <div className="bg-white rounded-lg shadow mt-2 sticky top-16">
              <div className="p-4">
                <h3 className="text-xs font-medium">Latest</h3>
                <div className="mt-4 space-y-3">
                  {['kodluyoruz', 'front-end', 'html', 'css', 'bootstrap'].map((tag) => (
                    <div key={tag} className="flex items-center">
                      <span className="text-xs font-bold">#</span>
                      <span className="ml-2 text-sm text-gray-500">{tag}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h4 className="text-xs font-semibold">Groups</h4>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-semibold">Events</span>
                    <span className="text-2xl text-gray-500">+</span>
                  </div>
                  <h4 className="text-xs font-semibold mt-3">Followed Hashtags</h4>
                  {['kodluyoruz', 'front-end'].map((tag) => (
                    <div key={tag} className="flex items-center mt-2">
                      <span className="text-xs font-bold">#</span>
                      <span className="ml-2 text-sm text-gray-500">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t">
                Discover more
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="w-1/2 mx-8">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow mb-4">
              <div className="p-4">
                <input
                  type="text"
                  className="w-full rounded-full border border-gray-300 px-4 py-2"
                  placeholder="Start a post"
                />
                <div className="flex justify-between mt-4">
                  <button className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-1 rounded">
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z" />
                    </svg>
                    <span className="ml-2 font-medium">Photo</span>
                  </button>
                  {/* Similar buttons for Video, Event, Write Article */}
                </div>
              </div>
            </div>

            {/* Posts */}
            {[1, 2, 3].map((post) => (
              <div key={post} className="bg-white rounded-lg shadow mb-4">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src="/api/placeholder/400/320" className="w-12 h-12 rounded-full" alt="Profile" />
                      <div className="ml-3">
                        <a href="#" className="font-medium text-gray-900 hover:underline">
                          David J. Malan
                        </a>
                        <div className="text-sm text-gray-500">I teach CS50</div>
                        <div className="text-sm text-gray-500">25h • 🌎</div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-4">Sample post content</p>
                  <img src="/api/placeholder/400/320" className="w-full mt-4 rounded" alt="Post" />
                  <div className="flex items-center mt-4">
                    <div className="flex -space-x-1">
                      {/* Reaction icons */}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">958</span>
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t">
                    <button className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-1 rounded">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span className="ml-2">Like</span>
                    </button>
                    {/* Similar buttons for Comment, Share, Send */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="w-1/4">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="font-medium">Add to your feed</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                {/* Suggested connections */}
              </div>
            </div>

            {/* Learning section and footer remain similar structure with Tailwind classes */}
          </div>
        </div>
      </div>

      {/* Messaging */}
      <div className="fixed bottom-0 right-4 w-72 bg-white shadow-lg rounded-t-lg">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center">
            <img src="/api/placeholder/400/320" className="w-8 h-8 rounded-full" alt="Profile" />
            <span className="ml-2 font-medium">Messaging</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-gray-600 hover:text-gray-800">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;