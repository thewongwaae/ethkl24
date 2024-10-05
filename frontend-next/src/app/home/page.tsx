"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VotingModal from "@/components/VotingModal";
import Toast from "@/components/Toast"; // Import the custom Toast component
import './styles.css';

export default function Home() {
  const [groupId, setGroupId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputInvalid, setIsInputInvalid] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const router = useRouter();

  const handleJoinGroup = () => {
    if (groupId) {
      console.log({ groupId });
      router.push(`/vote/${groupId}`);
    } else {
      setIsInputInvalid(true);
      setIsToastVisible(true);
      setTimeout(() => setIsInputInvalid(false), 1000); // Reset after animation
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-start w-full p-4 max-w-lg mx-auto">
      <div className="flex items-center mb-4 w-full">
        <input
          type="text"
          placeholder="Enter Vote ID"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          className={`border rounded-l-md p-2 flex-grow text-black placeholder-gray-400 ${isInputInvalid ? 'input-invalid' : ''}`}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition ml-2 text-lg font-bold shadow-lg"
          onClick={handleJoinGroup}
        >
          Join Voting Room
        </button>
      </div>
      <button 
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition w-full text-lg font-bold shadow-lg"
        onClick={handleOpenModal}
      >
        Create Voting Room
      </button>
      <VotingModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Toast 
        message="Please enter a Vote ID" 
        isVisible={isToastVisible} 
        onClose={() => setIsToastVisible(false)} 
      />
    </div>
  );
}