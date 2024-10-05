"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import "../../globals.css";

interface Option {
  name: string;
  votes: number; // Add other properties as necessary
}

interface VoteData {
  group_id: string;
  topic: string;
  description: string;
  options: Option[];
}


export default function VotePageRoute() {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState<VoteData | null>(null);

  // wrapping this logic inside useEffect ensures the data is fetched after the component has mounted.
  useEffect(() => {
    const fetchVote = async () => {
      try {
        const response = await fetch(`/api/fetchVote`);

        if (response.status === 200) {
          const result = await response.json();
          setData(result);
        } else if (response.status === 404) {
          console.log("Vote group does not exist");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchVote();
  }, [id]);


  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data); // test

  const { group_id, topic, description, options } = data

  console.log("options", options);
  console.log(options[0]['name'])

  return (
    <div>
      {/* Additional data display */}

      <div> Topic: {topic} </div>
      <div> Description: {description} </div>
      <div className="flex flex-row space-x-8">
        {options.map((option : Option) => (
          <button
            key={option.name}
            className="bg-blue-500 text-white text-lg font-bold py-4 px-8 rounded-lg hover:bg-blue-600 transition duration-300 text-center"
            type="button"
            onClick={() => console.log(`Option ${option.name} clicked`)}
          >
            {option.name}
          </button>
        ))}
      </div>

    </div>
  );
}
