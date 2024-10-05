"use client";

import { useParams, useRouter } from "next/navigation";
import "../../globals.css";

export default function GroupPageRoute() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  // Sample data to display as boxes (replace with actual data)
  const boxes = [
    { boxId: 1, title: "Trump or Biden?" },
    { boxId: 2, title: "Who's gonna win the grammy's" },
    { boxId: 3, title: "Topic 3" },
  ];

  // Function to handle box click
  const handleBoxClick = (boxId: number) => {
    router.push(`/vote/${boxId}`);
  };

  // You might want to check validity of ID here and render accordingly
  // For example:
  // if (!isValidId(id)) {
  //     return <ErrorComponent />;
  // }

  return (
    <div className="relative">
      <h1>Group: {id}</h1>

    <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition" type="button">
        Create New Topic
    </button>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {boxes.map((box) => (
          <div
            key={box.boxId}
            className="border p-4 rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => handleBoxClick(box.boxId)}
          >
            <h2 className="font-bold">{box.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
