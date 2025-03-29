import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMessage, editMessage } from '../store/chatSlice';
import { format } from 'date-fns';

export default function MessageList({ roomId }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.rooms[roomId].messages);
  const isTyping = useSelector((state) => state.chat.rooms[roomId].isTyping);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDelete = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      dispatch(deleteMessage({ roomId, messageId }));
    }
  };

  const handleEdit = (messageId, currentText) => {
    const newText = window.prompt('Edit message:', currentText);
    if (newText && newText !== currentText) {
      dispatch(editMessage({ roomId, messageId, newText }));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className="flex flex-col items-end"
        >
          <div className="max-w-[70%] bg-blue-500 text-white rounded-lg px-4 py-2">
            <p>{message.text}</p>
            <div className="text-xs opacity-75 mt-1 flex items-center gap-2">
              <span>{format(new Date(message.timestamp), 'HH:mm')}</span>
              {message.isEdited && <span>(edited)</span>}
            </div>
          </div>
          <div className="mt-1 space-x-2">
            <button
              onClick={() => handleEdit(message.id, message.text)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(message.id)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex items-center gap-2 text-gray-500">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span>Typing...</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
} 