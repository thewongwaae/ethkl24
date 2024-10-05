"use client";

import { useState } from "react";

export default function VotingModal({ isOpen, onClose }) {
  const [votingTopic, setVotingTopic] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log({ votingTopic, description, options });

    // Clear fields
    setVotingTopic("");
    setDescription("");
    setOptions("");
    
    // Close modal after submission
    onClose();
  };

  if (!isOpen) return null; // Don't render if the modal is not open

  return (
    <div
      id="voting-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Voting Topic
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="voting-topic"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Voting Topic
                </label>
                <input
                  type="text"
                  id="voting-topic"
                  value={votingTopic}
                  onChange={(e) => setVotingTopic(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="options"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  List of Options (comma-separated)
                </label>
                <input
                  type="text"
                  id="options"
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Option 1, Option 2, Option 3"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
