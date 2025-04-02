import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMessage, editMessage } from '../store/chatSlice';
import { format } from 'date-fns';
import { UserAuth } from '../context/Authcontext';

export default function MessageList({ roomId }) {
  const dispatch = useDispatch();
  const { currentUser } = UserAuth();
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
    <div className="flex-1 overflow-y-auto text-blue-500 p-4 space-y-4 pb-20">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex flex-col ${
            message.userId === currentUser?.uid ? 'items-end' : 'items-start'
          }`}
        >
          <div
            className={`max-w-[70%] px-4 py-2 relative rounded-xl ${
              message.userId === currentUser?.uid
                ? 'bg-blue-500 text-white rounded-br-xl'
                : 'bg-gray-200 text-gray-800 rounded-bl-xl'
            }`}
          >
            {/* Display Name */}
            {message.displayName && (
              <p className="text-xs font-semibold mb-1">{message.displayName}</p>
            )}
            
            <p>{message.text}</p>
            <div className="text-xs opacity-75 mt-1 flex items-center gap-2">
              <span>{format(new Date(message.timestamp), 'HH:mm')}</span>
              {message.isEdited && <span>(edited)</span>}
            </div>

            {/* Chat Bubble Tail */}
            {message.userId === currentUser?.uid ? (
              <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-blue-500 border-b-[10px] border-b-transparent"></div>
            ) : (
              <div className="absolute bottom-0 left-0 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-gray-200 border-b-[10px] border-b-transparent"></div>
            )}
          </div>

          {/* Show Edit/Delete for all users */}
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

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-end gap-2 pb-5 text-gray-500">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
          </div>
          <span>Typing...</span>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}
