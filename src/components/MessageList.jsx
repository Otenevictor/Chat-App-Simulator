import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMessage, editMessage } from '../store/chatSlice';
import { format } from 'date-fns';
import { UserAuth } from '../contexts/authContext';

export default function MessageList({ roomId }) {
  const dispatch = useDispatch();
  const { currentUser } = UserAuth();
  const messages = useSelector((state) => state.chat.rooms[roomId].messages);
  const isTyping = useSelector((state) => state.chat.rooms[roomId].isTyping);
  const messagesEndRef = useRef(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteMessageId, setDeleteMessageId] = useState(null);
  const [deleteMessageText, setDeleteMessageText] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDeleteConfirmation = (messageId, text) => {
    setDeleteMessageId(messageId);
    setDeleteMessageText(text);
    setShowDeletePopup(true);
  };

  const handleDelete = () => {
    dispatch(deleteMessage({ roomId, messageId: deleteMessageId }));
    setShowDeletePopup(false);
  };

  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
    setDeleteMessageId(null);
    setDeleteMessageText('');
  };

  const handleEditStart = (messageId, currentText) => {
    setEditingMessageId(messageId);
    setEditedText(currentText);
  };

  const handleEditSave = () => {
    if (editedText.trim()) {
      dispatch(editMessage({
        roomId,
        messageId: editingMessageId,
        newText: editedText
      }));
    }
    setEditingMessageId(null);
    setEditedText('');
  };

  const handleEditCancel = () => {
    setEditingMessageId(null);
    setEditedText('');
  };

  return (
    <div className="flex-1 overflow-y-auto text-blue-500 p-4 space-y-4 pb-20">
      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <p className="mb-4">Delete this message?</p>
            <p className="mb-4 text-gray-600 text-sm italic">"{deleteMessageText}"</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className="flex flex-col items-end"
        >
          <div className="max-w-[70%] px-4 py-2 relative rounded-xl bg-blue-500 text-white rounded-br-xl">
            {editingMessageId === message.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full p-1 border rounded"
                  autoFocus
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={handleEditSave}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="text-xs bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p>{message.text}</p>
                <div className="text-xs opacity-75 mt-1 flex items-center gap-2">
                  <span>{format(new Date(message.timestamp), 'HH:mm')}</span>
                  {message.isEdited && <span>(edited)</span>}
                </div>
              </>
            )}

            <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-gray-300 border-b-[10px] border-b-transparent"></div>
          </div>

          {editingMessageId !== message.id && (
            <div className="mt-1 space-x-2">
              <button
                onClick={() => handleEditStart(message.id, message.text)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteConfirmation(message.id, message.text)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

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