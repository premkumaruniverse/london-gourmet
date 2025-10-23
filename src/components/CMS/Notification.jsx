import React from 'react';

const Notification = ({ message, type }) => {
    if (!message) return null;

    const notificationStyles = {
        success: 'bg-green-600 text-white',
        error: 'bg-red-600 text-white',
    };

    return (
        <div className={`p-4 rounded-lg shadow-xl ${notificationStyles[type]}`}>
            {message}
        </div>
    );
};

export default Notification;