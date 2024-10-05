 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Join() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleJoinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(`/api/joinVote?id=${roomId}`);
      if (response.status === 200) {
        const data = await response.json();
        const { voteId } = data;
        router.push(`/vote/${voteId}`);
      } else if (response.status === 404) {
        console.log("Vote group does not exist");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-8 items-center justify-center">
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