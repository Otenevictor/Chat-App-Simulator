export default function RoomList({ rooms, currentRoom, onRoomSelect }) {
  return (
    <div className="space-y-2 text-blue-500  ">
      {rooms.map((room) => (
        <button
          key={room}
          onClick={() => onRoomSelect(room)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            currentRoom === room
              ? 'bg-blue-400 text-blue-100'
              : 'hover:bg-gray-100'
          }`}
        >
          # {room}
        </button>
      ))}
    </div>
  );
} 