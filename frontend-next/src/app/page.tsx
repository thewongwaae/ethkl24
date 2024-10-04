"use client";

export default function Home() {
  const handleJoin = () => {
    console.log("Join Vote");
  };

  const handleCreate = () => {
    console.log("Create Vote");
  };

  return (
    <div className="flex flex-row space-x-8">
      <button
        className="bg-blue-500 text-white text-lg font-bold py-4 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={handleJoin}
      >
        Join Vote
      </button>
      <button
        className="bg-green-500 text-white text-lg font-bold py-4 px-8 rounded-lg hover:bg-green-600 transition duration-300"
        onClick={handleCreate}
      >
        Create Vote
      </button>
    </div>
  );
}