import React from 'react';

interface MessageActionsProps {
  isDark: boolean;
  messageId: number;
}

const MessageActions: React.FC<MessageActionsProps> = ({ isDark, messageId }) => {
  const handleCreateVIP = () => {
    console.log(`Create VIP for message ${messageId}`);
  };

  const handleDelete = () => {
    console.log(`Delete message ${messageId}`);
  };

  return (
    <div className='flex justify-end gap-3 mb-4' role='toolbar' aria-label='Message actions'>
      <button
        onClick={handleCreateVIP}
        className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        aria-label='Create new VIP contact from this message'
      >
        Create new VIP
      </button>
      <button
        onClick={handleDelete}
        className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
        aria-label='Delete this message'
      >
        Delete
      </button>
    </div>
  );
};

export default MessageActions;
