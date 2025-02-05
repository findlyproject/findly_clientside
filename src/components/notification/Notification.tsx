import React from 'react';

const Notification = () => {
  const notifications = [
    { id: 1, type: 'success', message: 'Your account has been created successfully!', log:"/assets/profile.png/" },
    { id: 2, type: 'error', message: 'There was an issue with your payment. Please try again.', log:"/assets/profile.png/" },
    { id: 3, type: 'info', message: 'Your profile was updated successfully.', log:"/assets/profile.png/" },
    { id: 4, type: 'warning', message: 'Your session is about to expire.', log:"/assets/profile.png/" },
    { id: 5, type: 'success', message: 'Your account has been created successfully!', log:"/assets/profile.png/" },
    { id: 6, type: 'error', message: 'There was an issue with your payment. Please try again.', log:"/assets/profile.png/" },
    { id: 7, type: 'info', message: 'Your profile was updated successfully.', log:"/assets/profile.png/" },
    { id: 8, type: 'warning', message: 'Your session is about to expire.', log:"/assets/profile.png/" },
    { id: 9, type: 'success', message: 'Your account has been created successfully!', log:"/assets/profile.png/" },
    { id: 10, type: 'error', message: 'There was an issue with your payment. Please try again.', log:"/assets/profile.png/" },
    { id: 11, type: 'info', message: 'Your profile was updated successfully.', log:"/assets/profile.png/" },
    { id: 12, type: 'warning', message: 'Your session is about to expire.', log:"/assets/profile.png/" },
  ];

  const getNotificationClass = (type:any) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-md flex items-center gap-3 ${getNotificationClass(notification.type)}`}
          >
            <img src={notification.log} alt="user logo" 
            className='w-8 h-8 bg-transparent'
            />
            <p className="text-sm">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
