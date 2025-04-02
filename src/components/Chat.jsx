import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchRoom, associateMessagesWithUser, clearRoomHistory } from '../store/chatSlice';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import RoomList from './RoomList';
import { UserAuth } from '../context/Authcontext';
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

export default function Chat() {
  const dispatch = useDispatch();
  const { currentUser, logout } = UserAuth();
  const currentRoom = useSelector((state) => state.chat.currentRoom);
  const rooms = useSelector((state) => Object.keys(state.chat.rooms));
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showRoomList, setShowRoomList] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState({
    name: "Guest User",
    avatar: "/api/placeholder/40/40",
    uid: null
  });
  
  // Update user information from authentication and load user-specific data
  useEffect(() => {
    if (currentUser) {
      const { uid, displayName, photoURL } = currentUser;
      
      setUser({
        name: displayName || "Anonymous User",
        avatar: photoURL || "/api/placeholder/40/40",
        uid: uid
      });
      
      // Associate current messages with this user if needed
      dispatch(associateMessagesWithUser({
        userId: uid,
        displayName: displayName || "Anonymous User"
      }));
      
      // Load user-specific data (can be expanded as needed)
      const userPreferences = localStorage.getItem(`user_prefs_${uid}`);
      if (userPreferences) {
        const prefs = JSON.parse(userPreferences);
        if (prefs.lastRoom) {
          dispatch(switchRoom(prefs.lastRoom));
        }
      }
    }
  }, [currentUser, dispatch]);
  
  // Save user preferences when room changes
  useEffect(() => {
    if (user.uid) {
      const userPrefs = { lastRoom: currentRoom };
      localStorage.setItem(`user_prefs_${user.uid}`, JSON.stringify(userPrefs));
    }
  }, [currentRoom, user.uid]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      // Reset user to default after logout
      setUser({
        name: "Guest User",
        avatar: "/api/placeholder/40/40",
        uid: null
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 300);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);
  const toggleRoomList = () => setShowRoomList(!showRoomList);

  // Add new room functionality
  const handleAddRoom = () => {
    const roomName = prompt('Enter new room name:');
    if (roomName && roomName.trim()) {
      dispatch({ type: 'chat/addNewRoom', payload: roomName.trim().toLowerCase() });
      toast.success(`Room "${roomName.trim().toLowerCase()}" created!`);
    }
  };
  
  // Clear chat history functionality
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
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false
      }
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 relative overflow-hidden">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Profile sidebar - overlay mode */}
      <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 flex flex-col z-20 ${sidebarExpanded ? 'w-64' : 'w-16'}`}>
        {/* Collapse/Expand button with improved visibility */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-8 bg-white border border-gray-300 rounded-full p-2 text-gray-800 shadow-md"
        >
          {sidebarExpanded ? 
            <FiChevronLeft size={24} className="text-blue-500" /> : 
            <FiChevronRight size={24} className="text-blue-500" />
          }
        </button>

        {/* Top section with user info */}
        <div className="flex flex-col items-center p-4 border-b border-gray-700 mt-4">
          {/* Navigation icons */}
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

        {/* Spacer to push logout to bottom */}
        <div className="flex-grow"></div>

        {/* Logout at the bottom - always show icon */}
        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 hover:bg-gray-700 transition-colors text-red-400">
            <FiLogOut size={20} />
            {sidebarExpanded && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main content - no more shifting, full width */}
      <div className="flex flex-1 h-full w-full">
        {/* Responsive room list sidebar with better overflow handling */}
        <div 
          className={`h-full bg-white border-r border-gray-200 transition-all duration-300 ${
            showRoomList || !isMobile ? 'w-40' : 'w-0'
          } ${isMobile && !showRoomList ? 'hidden' : 'block'} ml-16`}
        >
          <div className="h-full flex flex-col p-4 overflow-hidden">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <h2 className="text-xl font-bold text-blue-500">Chat Rooms</h2>
              <button 
                onClick={handleAddRoom}
                className="p-1 rounded-full hover:bg-gray-100 text-blue-500"
              >
                <FiPlus size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              <RoomList
                rooms={rooms}
                currentRoom={currentRoom}
                onRoomSelect={(room) => {
                  dispatch(switchRoom(room));
                  if (isMobile) {
                    setShowRoomList(false);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Main chat area with proper overflow handling */}
        <div className="flex-1 flex flex-col h-full text-blue-500 overflow-hidden">
          {/* Chat header - fixed height */}
          <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center">
              {isMobile && (
                <button 
                  onClick={toggleRoomList} 
                  className="mr-4 p-2 rounded-full hover:bg-gray-100"
                >
                  <HiChatBubbleOvalLeft size={20} className="text-blue-500" />
                </button>
              )}
              <h1 className="text-xl font-bold">#{currentRoom}</h1>
            </div>
            
            {/* Clear chat history button */}
            <button 
              onClick={handleClearHistory}
              className="p-2 rounded-full hover:bg-gray-100 text-red-500 flex items-center gap-1"
              title="Clear chat history"
            >
              <FiTrash2 size={18} />
              {!isMobile && <span className="text-sm">Clear History</span>}
            </button>
          </div>

          {/* Chat messages and input - with correct scrolling */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Message list with scrolling */}
            <div className="flex-1 overflow-y-auto">
              <MessageList roomId={currentRoom} />
            </div>
            
            {/* Input always at bottom, not scrolling with content */}
            <div className="flex-shrink-0 bg-white border-t border-gray-200">
              <MessageInput roomId={currentRoom} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}