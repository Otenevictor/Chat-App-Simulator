Chat Simulator
A simple web-based chat simulator built using React and Firebase Authentication. This app allows users to send and view messages, simulating real-time communication with a basic messaging interface. It provides hands-on practice in React, emphasizing state management, event handling, dynamic UI rendering, and user authentication.

Features
Firebase Authentication: Users can sign up, sign in, and sign out with Firebase Authentication, ensuring secure and personalized access.

Chat History: Displays a list of sent messages, including the message content and timestamp.

Send Message: Users can type and send messages, which immediately appear in the chat history.

Auto-Scroll: Automatically scrolls to the latest message to keep the chat focused.

Clear Chat: Option to clear all messages with a confirmation prompt.

Message Styling: Differentiates messages visually (e.g., sent messages aligned to the right with distinct styles).

Typing Indicator: Simulated "typing..." animation before a message is sent.

Multiple Chat Rooms: Users can switch between different chat rooms, each storing its own message history.

Message Editing: Allows users to edit or delete sent messages.

UI Requirements
Layout: A simple chat-like interface with a message display area and input field.

Responsiveness: The app is responsive and works on both desktop and mobile devices.

Styling: Built with CSS and Tailwind CSS (or Material-UI/Bootstrap as needed).

Tech Stack
Frontend: React (latest stable version)

State Management: Local state management using React hooks (useState, useEffect)

Data Storage: Messages stored in local memory or localStorage (no backend required)

Authentication: Firebase Authentication for secure user sign-up, sign-in, and sign-out

Setup & Installation
To run the Chat Simulator app locally:

Clone this repository:


git clone <repository-url>
Navigate to the project folder:


cd chat-simulator
Install dependencies:


npm install
Set up Firebase:

Create a Firebase project in the Firebase console.

Enable Firebase Authentication (Google).

Create a .env file in the root of the project and add your Firebase config values:

ini
Copy
Edit
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id


npm start
Open your browser and go to http://localhost:3000 to see the app in action.

How It Works
Firebase Authentication: Handles user sign-up, sign-in, and sign-out, ensuring that users can securely access the chat.

The app maintains a list of messages in local state, allowing users to send new messages, edit them, and delete them as needed.

A simulated "typing..." indicator is triggered when a user starts typing in the input field.

Each chat room stores its own set of messages, allowing users to switch between rooms without losing data.

Contributing
Feel free to fork this project, submit issues, and make pull requests. Contributions to improve the app's functionality and UI are always welcome!

License
This project is open source and available under the MIT License.