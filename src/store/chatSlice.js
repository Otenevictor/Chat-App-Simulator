import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: {
    general: {
      messages: [],
      isTyping: false
    },
    random: {
      messages: [],
      isTyping: false
    },
    support: {
      messages: [],
      isTyping: false
    }
  },
  currentRoom: 'general'
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const { roomId, message } = action.payload;
      state.rooms[roomId].messages.push({
        id: Date.now(),
        text: message,
        timestamp: new Date().toISOString(),
        isEdited: false
      });
    },
    deleteMessage: (state, action) => {
      const { roomId, messageId } = action.payload;
      state.rooms[roomId].messages = state.rooms[roomId].messages.filter(
        msg => msg.id !== messageId
      );
    },
    editMessage: (state, action) => {
      const { roomId, messageId, newText } = action.payload;
      const message = state.rooms[roomId].messages.find(
        msg => msg.id === messageId
      );
      if (message) {
        message.text = newText;
        message.isEdited = true;
      }
    },
    setTypingStatus: (state, action) => {
      const { roomId, isTyping } = action.payload;
      state.rooms[roomId].isTyping = isTyping;
    },
    clearChat: (state, action) => {
      const { roomId } = action.payload;
      state.rooms[roomId].messages = [];
    },
    switchRoom: (state, action) => {
      state.currentRoom = action.payload;
    }
  }
});

export const {
  sendMessage,
  deleteMessage,
  editMessage,
  setTypingStatus,
  clearChat,
  switchRoom
} = chatSlice.actions;

export default chatSlice.reducer; 