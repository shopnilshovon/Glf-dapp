import React from 'react';

const Notifications = ({ message, type }) => {
  if (!message) return null;

  const baseStyle = "p-3 rounded mb-4 text-sm";
  const typeStyles = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white"
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type] || typeStyles.info}`}>
      {message}
    </div>
  );
};

export default Notifications;
