"use client";

export default function Home() {
  return (
    <div className="flex flex-row space-x-8">
      <a
        href="/join"
        target="_blank"
        className="bg-blue-500 text-white text-lg font-bold py-4 px-8 rounded-lg hover:bg-blue-600 transition duration-300 text-center"
        >
        Join Vote
      </a>
      <a
        href="/create"
        target="_blank"
        className="bg-green-500 text-white text-lg font-bold py-4 px-8 rounded-lg hover:bg-green-600 transition duration-300 text-center"
      >
        Create Vote
      </a>
    </div>
  );
}