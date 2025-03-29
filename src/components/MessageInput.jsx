import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage, setTypingStatus } from '../store/chatSlice';

export default function MessageInput({ roomId }) {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const typingTimeoutRef = useRef(null);

  const handleTyping = () => {
    dispatch(setTypingStatus({ roomId, isTyping: true }));
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      dispatch(setTypingStatus({ roomId, isTyping: false }));
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Clear typing status
    dispatch(setTypingStatus({ roomId, isTyping: false }));
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    dispatch(sendMessage({ roomId, message: message.trim() }));
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </form>
  );
} 