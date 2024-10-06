"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import "../../globals.css";
import "./styles.css";
import { useWalletContext } from "@/components/wallet";

interface Option {
  name: string;
  id: number;
  votes: number;
}

interface VoteData {
  vote_id: string;
  title: string;
  description: string;
  options: Option[];
}

export default function VotePageRoute() {
  const { id } = useParams();
  const [data, setData] = useState<VoteData | null>(null);
  const [clickedOption, setClickedOption] = useState<string | null>(null);
	const { walletAddress, connectWallet, disconnectWallet, contract } = useWalletContext();

  useEffect(() => {
    const fetchVote = async () => {
      try {
        const response = await fetch(`/api/fetchVote`);

        if (response.ok) {
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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  const { title, description, options } = data;

  const handleClick = async (optionName: string) => {
	console.log(contract);
		// console.log(await contract.isUserInGroup());
		// await contract.createGroup("test"," tes", ['test']);
		// await contract.userJoinGroup(1);
    if (clickedOption) return;


    setClickedOption(optionName);
		contract.doVote(1);
    setData((prevData) => {
      if (!prevData) return null;


      const updatedOptions = prevData.options.map((option) => {
        if (option.name === optionName) {
          return { ...option, votes: option.votes + 1 };
        } else if (clickedOption === option.name) {

          return { ...option, votes: option.votes - 1 };
        }
        return option;
      });

      return { ...prevData, options: updatedOptions };
    });

    console.log(`Option ${clickedOption} clicked`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="shadow-lg rounded-xl p-10 w-full max-w-2xl bg-gray-100">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">{title}</h1>
        <p className="mb-8 text-center text-gray-600 text-lg">{description}</p>
        <div className="flex flex-wrap justify-center gap-6">
          {options.map((option: Option) => (
            <button
              key={option.name}
              className={`bg-blue-500 text-white text-lg font-semibold py-3 px-6 rounded-xl hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${clickedOption === option.name ? 'bg-green-700 hover:bg-green-800' : 'bg-blue-500 hover:bg-blue-600'} ${clickedOption === option.name ? 'jiggle' : ''}` }
              type="button"
              onClick={() => handleClick(option.name)}
            >
              <div className="flex flex-col items-center">
                <div className="mb-1">{option.name}</div>
                <div className="text-sm text-gray-200">{option.votes} votes</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
