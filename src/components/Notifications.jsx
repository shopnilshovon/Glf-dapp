import React from 'react';

const Notifications = ({ message, type }) => {
  if (!message) return null;

  const bgColor =
    type === 'success' ? 'bg-green-600'
    : type === 'error' ? 'bg-red-600'
    : type === 'warning' ? 'bg-yellow-500'
    : 'bg-gray-700';

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-fade-in">
      <div className={`px-6 py-3 rounded-xl shadow-lg text-white ${bgColor}`}>
        {message}
      </div>
      <style jsx="true">{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Notifications;