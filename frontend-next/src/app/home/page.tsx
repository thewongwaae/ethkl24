"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleJoinClick = () => {
    const id = 1;
    router.push(`/vote/${id}`);
  };

  const handleCreateClick = () => {
    router.push(`/create`);
  };

  return (
    <div className="flex flex-row space-x-8">

    <button
      className="bg-blue-500 text-white text-lg font-bold py-4 px-8 rounded-lg hover:bg-blue-600 transition duration-300 text-center"
      type="button"
      onClick={handleJoinClick}>
      Join a group
    </button>

    <button
      className="bg-green-500 text-white text-lg font-bold py-4 px-8 rounded-lg hover:bg-green-600 transition duration-300 text-center"
      type="button"
      onClick={handleCreateClick}>
      Create a group
    </button>
    </div>
  );
}
