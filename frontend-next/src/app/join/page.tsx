"use client";

import { useState } from "react";

export default function Join() {
  const [roomId, setRoomId] = useState("");

  const handleJoinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  const handleCreate = () => {
    console.log("Room ID:", roomId);
  };

  return (
    <div className="flex flex-col space-y-8 items-center justify-center min-h-screen">
      <input
        type="text"
        value={roomId}
        onChange={handleJoinChange}
        className="bg-gray-200 text-black text-lg font-bold py-4 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Room ID"
      />
      <button
        className="bg-green-500 text-white text-lg font-bold py-4 px-8 rounded-lg hover:bg-green-600 transition duration-300"
        onClick={handleCreate}
      >
        Enter Room
      </button>
    </div>
  );
}