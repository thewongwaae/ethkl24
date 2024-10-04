"use client";

import { useParams } from "next/navigation";
import "../../globals.css";

export default function VotePageRoute() {
  const params = useParams();
  const id = params.id;
  console.log(id);

  return (
    <div>
      <h1>Vote Page for ID: {id}</h1>
      {/* Add your page content here */}
    </div>
  );
}