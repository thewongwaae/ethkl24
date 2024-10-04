"use client";

import { useState } from "react";

export default function Join() {
  const [voteTopic, setVoteTopic] = useState("");

  const handleCreateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoteTopic(event.target.value);
  };

  const handleCreate = () => {
    console.log("Vote Topic:", voteTopic);
  };

  return (
    <div className="flex flex-col space-y-8 items-center justify-center min-h-screen">
      <input
        type="text"
        value={voteTopic}
        onChange={handleCreateChange}
        className="bg-gray-200 text-black text-lg font-bold py-4 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Vote Topic"
      />
      <button
        className="bg-green-500 text-white text-lg font-bold py-4 px-8 rounded-lg hover:bg-green-600 transition duration-300"
        onClick={handleCreate}
      >
        Create Room
      </button>
    </div>
  );
}