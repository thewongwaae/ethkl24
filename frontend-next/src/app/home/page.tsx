"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import VotingModal from "@/components/VotingModal";

export default function Home() {
  const [groupId, setGroupId] = useState("");
  // State to handle modal open or close
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Check whether group exist, if yes then route to /vote/<group_id>
  const handleJoinGroup = () => {
    if (groupId) {
      console.log({ groupId });
      router.push(`/vote/${groupId}`); // Route to the vote page with the entered ID
    }
  };

  // Handlers for open / close modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="flex flex-col items-start w-full p-4 max-w-lg mx-auto">
      <div className="flex items-center mb-4 w-full">
        {/* Text Box */}
        <input
          type="text"
          placeholder="Enter Group ID"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)} // Update state on input change
          className="border rounded-l-md p-2 flex-grow text-black placeholder-gray-400"
        />

        {/* Join Group Button */}
        <button
          className="bg-blue-500 text-white p-2 rounded-r-md ml-2"
          onClick={handleJoinGroup} // Handle button click
        >
          Join Group
        </button>
      </div>

      {/* Create Button */}
      <button 
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition w-full"
        onClick={handleOpenModal}
        >
        Create Group
      </button>

      <VotingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );

}
