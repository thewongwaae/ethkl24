"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWalletContext } from "@/components/wallet";

export default function Home() {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  // const [voteId, setVoteId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState("");

  const { walletAddress, connectWallet, disconnectWallet, contract, voteId, setVoteId, groupId, setGroupId } = useWalletContext();

  const handleJoinVote = () => {
    if (voteId.trim()) {
      router.push(`/vote/${voteId}`);
    }
  };

  const handleCreateVote = async () => {
    if (!roomName.trim()) return;

    const optionsArray = options.split(',').map(option => option.trim());

    try {
      const response = await fetch("/api/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: roomName,
          description: description,
          options: optionsArray
        }),
      });

      const data = await response.json();
      if (data.id) {
        router.push(`/vote/${data.id}`);
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-400 mb-4">
              Voting App
            </h1>
            <p className="text-gray-400 text-lg md:text-xl">
              Create or join a voting room
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="group relative overflow-hidden rounded-2xl bg-purple-600 p-8 transition-all duration-200 hover:bg-purple-700 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Join a Vote</h3>
                <p className="text-purple-200 text-sm">
                  Enter a vote ID to join an existing voting room
                </p>
              </div>
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="group relative overflow-hidden rounded-2xl bg-purple-800 p-8 transition-all duration-200 hover:bg-purple-900 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Create a Vote</h3>
                <p className="text-purple-200 text-sm">
                  Start a new voting room for your group
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Join Vote Modal */}
        {isJoinModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-lg relative">
              <button
                onClick={() => setIsJoinModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white text-xl"
              >
                ×
              </button>

              <h2 className="text-3xl font-bold text-purple-400 mb-8">Join a Vote</h2>

              <input
                type="text"
                placeholder="Enter Vote ID"
                value={voteId}
                onChange={(e) => setVoteId(e.target.value)}
                className="w-full bg-gray-700 border border-purple-500 rounded-xl p-4 text-white placeholder-gray-400 mb-8 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              />

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsJoinModalOpen(false)}
                  className="px-6 py-3 text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleJoinVote}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Vote Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-lg relative">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white text-xl"
              >
                ×
              </button>

              <h2 className="text-3xl font-bold text-purple-400 mb-8">Create a Vote</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-purple-300 text-lg mb-2">Room Name</label>
                  <input
                    type="text"
                    placeholder="Enter room name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full bg-gray-700 border border-purple-500 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-purple-300 text-lg mb-2">Description (Optional)</label>
                  <input
                    type="text"
                    placeholder="Enter room description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-gray-700 border border-purple-500 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-purple-300 text-lg mb-2">List of Options (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="Option 1,Option 2, Option 3"
                    value={options}
                    onChange={(e) => setOptions(e.target.value)}
                    className="w-full bg-gray-700 border border-purple-500 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-6 py-3 text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateVote}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
