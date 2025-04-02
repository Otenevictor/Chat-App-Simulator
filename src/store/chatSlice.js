import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Helper function to load rooms from localStorage
const loadRoomsFromStorage = () => {
  try {
    const savedRooms = localStorage.getItem('chatRooms');
    return savedRooms ? JSON.parse(savedRooms) : null;
  } catch (error) {
    console.error('Error loading rooms from localStorage:', error);
    return null;
  }
};

// Helper function to save rooms to localStorage
const saveRoomsToStorage = (rooms) => {
  try {
    localStorage.setItem('chatRooms', JSON.stringify(rooms));
  } catch (error) {
    console.error('Error saving rooms to localStorage:', error);
  }
};

// Default rooms setup
const defaultRooms = {
  general: { messages: [], isTyping: false },
  random: { messages: [], isTyping: false },
  support: { messages: [], isTyping: false },
};

// Initial state with localStorage support
const initialState = {
  rooms: loadRoomsFromStorage() || defaultRooms,
  currentRoom: 'general',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    switchRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    sendMessage: (state, action) => {
      const { roomId, message } = action.payload;
      const newMessage = {
        id: uuidv4(),
        text: message,
        timestamp: new Date().toISOString(),
        isEdited: false,
      };
      state.rooms[roomId].messages.push(newMessage);
      saveRoomsToStorage(state.rooms);
    },
    deleteMessage: (state, action) => {
      const { roomId, messageId } = action.payload;
      state.rooms[roomId].messages = state.rooms[roomId].messages.filter(
        (message) => message.id !== messageId
      );
      saveRoomsToStorage(state.rooms);
    },
    editMessage: (state, action) => {
      const { roomId, messageId, newText } = action.payload;
      const message = state.rooms[roomId].messages.find(
        (message) => message.id === messageId
      );
      if (message) {
        message.text = newText;
        message.isEdited = true;
        saveRoomsToStorage(state.rooms);
      }
    },
    setTypingStatus: (state, action) => {
      const { roomId, isTyping } = action.payload;
      state.rooms[roomId].isTyping = isTyping;
    },
    addNewRoom: (state, action) => {
      const roomName = action.payload;
      if (!state.rooms[roomName]) {
        state.rooms[roomName] = { messages: [], isTyping: false };
        saveRoomsToStorage(state.rooms);
      }
    },
    deleteRoom: (state, action) => {
      const roomName = action.payload;
      if (roomName !== 'general' && state.rooms[roomName]) {
        delete state.rooms[roomName];
        if (state.currentRoom === roomName) {
          state.currentRoom = 'general';
        }
        saveRoomsToStorage(state.rooms);
      }
    },
    clearRoomHistory: (state, action) => {
      const roomName = action.payload;
      if (state.rooms[roomName]) {
        state.rooms[roomName].messages = [];
        saveRoomsToStorage(state.rooms);
      }
    },
    associateMessagesWithUser: (state, action) => {
      const { userId, displayName } = action.payload;
      Object.keys(state.rooms).forEach(roomId => {
        state.rooms[roomId].messages.forEach(message => {
          if (!message.userId) {
            message.userId = userId;
            message.displayName = displayName;
          }
        });
      });
      saveRoomsToStorage(state.rooms);
    },
  },
});

export const {
  switchRoom,
  sendMessage,
  deleteMessage,
  editMessage,
  setTypingStatus,
  addNewRoom,
  deleteRoom,
  clearRoomHistory,
  associateMessagesWithUser
} = chatSlice.actions;

export default chatSlice.reducer;
