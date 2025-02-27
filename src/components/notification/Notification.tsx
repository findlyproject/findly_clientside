"use client"
import { useState } from 'react';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  
  // Sample notification data
  const notifications = [
    {
      id: 1,
      type: 'join',
      user: {
        name: 'Anna Srzand',
        avatar: '/avatars/anna.jpg',
      },
      action: 'joined to',
      target: '🔥 Final Presentation',
      time: '2h ago',
      category: 'Social Media Plan',
      unread: true,
    },
    {
      id: 2,
      type: 'mention',
      user: {
        name: 'Jess Raddon',
        initials: 'JR',
        color: 'bg-orange-200',
      },
      action: 'mention you in',
      target: '😍 Tennis List',
      time: '4h ago',
      category: 'Hobby List',
      unread: true,
    },
    {
      id: 3,
      type: 'request',
      user: {
        name: 'Sandra Marx',
        avatar: '/avatars/sandra.jpg',
      },
      action: 'is requesting to upgrade Plan',
      time: '12h ago',
      category: 'Hobby List',
      requiresAction: true,
      unread: true,
    },
    {
      id: 4,
      type: 'upload',
      user: {
        name: 'Adam Smith',
        avatar: '/avatars/adam.jpg',
      },
      action: 'upload a file',
      file: {
        name: 'landing_page_ver2.fig',
        size: '2mb',
      },
      time: '1d ago',
      unread: false,
    },
    {
      id: 5,
      type: 'edit',
      user: {
        name: 'Ralph Turner',
        initials: 'RT',
        color: 'bg-purple-200',
      },
      action: 'edited',
      target: '🎉 Celebrate Info',
      time: '4h ago',
      category: 'Hobby List',
      followUp: "Let's add it to the main secret document",
      secretKey: 'x9ys',
      unread: false,
    },
    {
      id: 5,
      type: 'edit',
      user: {
        name: 'Ralph Turner',
        initials: 'RT',
        color: 'bg-purple-200',
      },
      action: 'edited',
      target: '🎉 Celebrate Info',
      time: '4h ago',
      category: 'Hobby List',
      followUp: "Let's add it to the main secret document",
      secretKey: 'x9ys',
      unread: false,
    },
    {
      id: 5,
      type: 'edit',
      user: {
        name: 'Ralph Turner',
        initials: 'RT',
        color: 'bg-purple-200',
      },
      action: 'edited',
      target: '🎉 Celebrate Info',
      time: '4h ago',
      category: 'Hobby List',
      followUp: "Let's add it to the main secret document",
      secretKey: 'x9ys',
      unread: false,
    },
    {
      id: 5,
      type: 'edit',
      user: {
        name: 'Ralph Turner',
        initials: 'RT',
        color: 'bg-purple-200',
      },
      action: 'edited',
      target: '🎉 Celebrate Info',
      time: '4h ago',
      category: 'Hobby List',
      followUp: "Let's add it to the main secret document",
      secretKey: 'x9ys',
      unread: false,
    },
    {
      id: 5,
      type: 'edit',
      user: {
        name: 'Ralph Turner',
        initials: 'RT',
        color: 'bg-purple-200',
      },
      action: 'edited',
      target: '🎉 Celebrate Info',
      time: '4h ago',
      category: 'Hobby List',
      followUp: "Let's add it to the main secret document",
      secretKey: 'x9ys',
      unread: false,
    },
    {
      id: 5,
      type: 'edit',
      user: {
        name: 'Ralph Turner',
        initials: 'RT',
        color: 'bg-purple-200',
      },
      action: 'edited',
      target: '🎉 Celebrate Info',
      time: '4h ago',
      category: 'Hobby List',
      followUp: "Let's add it to the main secret document",
      secretKey: 'x9ys',
      unread: false,
    },
    {
      id: 5,
      type: 'edit',
      user: {
        name: 'Ralph Turner',
        initials: 'RT',
        color: 'bg-purple-200',
      },
      action: 'edited',
      target: '🎉 Celebrate Info',
      time: '4h ago',
      category: 'Hobby List',
      followUp: "Let's add it to the main secret document",
      secretKey: 'x9ys',
      unread: false,
    },
  ];

  const tabs = [
    { name: 'All', count: 8 },
    { name: 'Following', count: 6 },
    { name: 'Archive', count: null },
  ];


  const markAllAsRead = () => {
    console.log('Marked all as read');
  };

  const handleAccept = (id) => {
    console.log('Accepted request', id);
  };
  
  const handleDecline = (id) => {
    console.log('Declined request', id);
  };

  const filterNotifications = () => {
    return notifications;
  };

  const renderNotification = (notification) => {
    return (
      <div key={notification.id} className={`py-3 px-4 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50/30' : ''}`}>
        <div className="flex items-start gap-3">
          {/* {renderAvatar(notification.user)} */}
          
          <div className="flex-1 min-w-0">
            <div className="text-sm">
              <span className="font-medium">{notification.user.name}</span>{' '}
              <span className="text-gray-600">{notification.action}</span>{' '}
              {notification.target && <span className="font-medium">{notification.target}</span>}
            </div>
            
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <span>{notification.time}</span>
              {notification.category && (
                <>
                  <span className="mx-1">•</span>
                  <span>{notification.category}</span>
                </>
              )}
            </div>
            
            {notification.file && (
              <div className="mt-2 flex items-center p-2 bg-gray-50 rounded-md">
                <div className="w-6 h-6 flex-shrink-0 mr-2">
                  <span className="text-red-500">📄</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{notification.file.name}</p>
                  <p className="text-xs text-gray-500">{notification.file.size}</p>
                </div>
              </div>
            )}
            
            {notification.requiresAction && (
              <div className="mt-2 flex gap-2">
                <button 
                  onClick={() => handleAccept(notification.id)}
                  className="px-4 py-1 bg-black text-white text-xs rounded-md hover:bg-gray-800"
                >
                  Accept
                </button>
                <button 
                  onClick={() => handleDecline(notification.id)}
                  className="px-4 py-1 bg-white text-black text-xs border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Decline
                </button>
              </div>
            )}
            
            {notification.followUp && (
              <div className="mt-2 text-sm">
                {notification.followUp} 
                {notification.secretKey && (
                  <span className="ml-1 px-1 py-0.5 bg-purple-100 text-purple-800 rounded text-xs">
                    {notification.secretKey}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
           
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-base font-semibold">Notifications</h3>
            <button 
              onClick={markAllAsRead} 
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Mark all as read
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b relative">
            {tabs.map((tab,index) => (
              <button
                key={index}
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  activeTab === tab.name 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                <div className="flex items-center justify-center">
                  {tab.name}
                  {tab.count && (
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                      activeTab === tab.name ? 'bg-black text-white' : 'bg-gray-100'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="h-screen overflow-y-auto">
            {filterNotifications().map(renderNotification)}
          </div>
        </div>
    </div>
  );
};

export default Notification;