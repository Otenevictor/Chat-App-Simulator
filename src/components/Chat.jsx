import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchRoom, associateMessagesWithUser, clearRoomHistory } from '../store/chatSlice';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import RoomList from './RoomList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiPlus,
  FiTrash2
} from "react-icons/fi";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
import { UserAuth } from '../contexts/authContext';

export default function Chat() {
  const dispatch = useDispatch();
  const { currentUser, logout } = UserAuth();
  const currentRoom = useSelector((state) => state.chat.currentRoom);
  const rooms = useSelector((state) => Object.keys(state.chat.rooms));
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showRoomList, setShowRoomList] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAddRoomPopup, setShowAddRoomPopup] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [user, setUser] = useState({
    name: "Guest User",
    avatar: "/api/placeholder/40/40",
    uid: null
  });

  useEffect(() => {
    if (currentUser) {
      const { uid, displayName, photoURL } = currentUser;
      setUser({
        name: displayName || "Anonymous User",
        avatar: photoURL || "/api/placeholder/40/40",
        uid: uid
      });
      dispatch(associateMessagesWithUser({
        userId: uid,
        displayName: displayName || "Anonymous User"
      }));
      const userPreferences = localStorage.getItem(`user_prefs_${uid}`);
      if (userPreferences) {
        const prefs = JSON.parse(userPreferences);
        if (prefs.lastRoom) dispatch(switchRoom(prefs.lastRoom));
      }
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (user.uid) {
      localStorage.setItem(`user_prefs_${user.uid}`, JSON.stringify({ lastRoom: currentRoom }));
    }
  }, [currentRoom, user.uid]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      setUser({ name: "Guest User", avatar: "/api/placeholder/40/40", uid: null });
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleAddRoom = () => setShowAddRoomPopup(true);

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {
      dispatch({ type: 'chat/addNewRoom', payload: newRoomName.trim().toLowerCase() });
      toast.success(`Room "${newRoomName.trim()}" created!`);
      setNewRoomName('');
      setShowAddRoomPopup(false);
    } else {
      toast.error('Please enter a valid room name');
    }
  };

  const handleClearHistory = () => {
    toast.info(
      <div>
        <p>Clear all messages in #{currentRoom}?</p>
        <div className="flex justify-end mt-2 gap-2">
          <button 
            onClick={() => {
              toast.dismiss();
              dispatch(clearRoomHistory(currentRoom));
              toast.success(`Chat history cleared for room #${currentRoom}`);
            }}
            className="px-2 py-1 bg-red-500 text-white rounded text-sm"
          >
            Yes, clear
          </button>
          <button 
            onClick={() => toast.dismiss()}
            className="px-2 py-1 bg-gray-500 text-white rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, draggable: false, closeButton: false }
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Add Room Popup */}
      {showAddRoomPopup && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg text-blue-500 font-semibold mb-4">Create New Room</h3>
            <input
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="w-full text-black p-2 border rounded mb-4"
              placeholder="Enter room name"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleCreateRoom()}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddRoomPopup(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRoom}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 flex flex-col z-30 ${sidebarExpanded ? 'w-64' : 'w-16'}`}>
        <button 
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="absolute -right-3 top-8 bg-white border border-gray-300 rounded-full p-2 text-gray-800 shadow-md"
        >
          {sidebarExpanded ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
        </button>
        <div className="flex flex-col items-center p-4 border-b border-gray-700 mt-4">
          <div className="w-full mb-6">
            <ul>
              <li className="mb-2">
                <button className="w-full flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
                  <FiHome size={20} />
                  {sidebarExpanded && <span className="ml-3">chat-simulator</span>}
                </button>
              </li>
            </ul>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden mb-2">
            <img src={user.avatar} alt="User avatar" className="w-full h-full object-cover" />
          </div>
          {sidebarExpanded && (
            <div className="text-center">
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-xs text-gray-400">Online</p>
            </div>
          )}
        </div>
        <div className="flex-grow"></div>
        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 hover:bg-gray-700 transition-colors text-red-400">
            <FiLogOut size={20} />
            {sidebarExpanded && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

     {/* Room List Sidebar/Overlay */}
{isMobile && showRoomList && (
  <div 
    className="fixed inset-0 bg-black/50 z-40" 
    onClick={() => setShowRoomList(false)}
  />
)}
<div className={`h-full bg-white border-r border-gray-200 transition-transform duration-300 ${
  isMobile ? 'fixed inset-y-0 left-0 w-64  z-50 transform' : 'static w-64 ml-16 translate-x-0'
} ${isMobile ? (showRoomList ? 'translate-x-0' : '-translate-x-full') : ''}`}> 
        <div className="h-full flex flex-col p-4 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-500">Chat Rooms</h2>
            <button 
              onClick={() => setShowRoomList(false)}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              {/* <FiChevronLeft size={24} /> */}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <RoomList
              rooms={rooms}
              currentRoom={currentRoom}
              onRoomSelect={(room) => {
                dispatch(switchRoom(room));
                setShowRoomList(false);
              }}
            />
          </div>
          <button
            onClick={handleAddRoom}
            className="mt-4 p-2 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
          >
            <FiPlus size={20} className="mr-2" />
            Add Room
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full text-blue-500 overflow-hidden ml-16">
        <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && (
              <button 
                onClick={() => setShowRoomList(true)} 
                className="mr-4 p-2 rounded-full hover:bg-gray-100"
              >
                <HiChatBubbleOvalLeft size={24} className="text-blue-500" />
              </button>
            )}
            <h1 className="text-xl font-bold">#{currentRoom}</h1>
          </div>
          <button 
            onClick={handleClearHistory}
            className="p-2 rounded-full hover:bg-gray-100 text-red-500 flex items-center gap-1"
            title="Clear chat history"
          >
            <FiTrash2 size={18} />
            {!isMobile && <span className="text-sm">Clear History</span>}
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <MessageList roomId={currentRoom} />
          </div>
          <div className="flex-shrink-0 bg-white border-t border-gray-200 p-4">
            <MessageInput roomId={currentRoom} />
          </div>
        </div>
      </div>
    </div>
  );
}