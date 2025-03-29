import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchRoom } from '../store/chatSlice';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import RoomList from './RoomList';

export default function Chat() {
  const dispatch = useDispatch();
  const currentRoom = useSelector((state) => state.chat.currentRoom);
  const rooms = useSelector((state) => Object.keys(state.chat.rooms));
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with room list */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Chat Rooms</h2>
        <RoomList
          rooms={rooms}
          currentRoom={currentRoom}
          onRoomSelect={(room) => dispatch(switchRoom(room))}
        />
      </div>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">#{currentRoom}</h1>
        </div>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <MessageList roomId={currentRoom} />
          <MessageInput roomId={currentRoom} />
        </div>
      </div>
    </div>
  );
} 