"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Join() {
  const [voteTopic, setVoteTopic] = useState("");
  const router = useRouter();

  const handleCreateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoteTopic(event.target.value);
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/joinVote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteTopic }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Vote ID:", data.VoteId); // SAVE THIS TO DB
      console.log("Vote Topic:", data.voteTopic); // SAVE THIS TO DB
      router.push(`/vote/${data.VoteId}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-8 items-center justify-center">
      <input
        type="text"
        value={voteTopic}
        onChange={handleCreateChange}
        className="bg-gray-200 text-black text-lg font-bold py-4 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Group Name"
      />
      <button
        className="bg-green-500 text-white text-lg font-bold py-4 px-8 rounded-lg hover:bg-green-600 transition duration-300"
        onClick={handleCreate}
      >
        Create Group
      </button>
    </div>
  );
}