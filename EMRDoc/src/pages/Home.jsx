import React from "react";
import bgimage from "../assets/doc.png";
import bgimage1 from "../assets/bg2.png";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className="mycontainer flex-row">
      <div
        className="content h-full p-10 w-1/2 shadow-2xl flex flex-col z-10 justify-center gap-5 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bgimage1})` }}
      >
        <h1 className="text-5xl font-bold text-left bg-center bg-no-repeat bg-cover text-sky-950 drop-shadow-lg font-noto-sans">
          E-Life
        </h1>
        <h4 className="text-lg text-sky-950 font-bold font-noto-sans">
          Welcome to E-Life , your comprehensive solution for managing
          electronic medical records efficiently and securely.
        </h4>
        <div className="w-72">
          <Button
            variant="contained"
            size="medium"
            style={{ backgroundColor: "rgb(93, 101, 215)", color: "#fff" }}
          >
            See more
          </Button>
        </div>
      </div>
      <div
        className="flex h-full w-1/2 bg-black bg-center bg-no-repeat bg-cover overflow-hidden"
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        {/* Content goes here */}
      </div>
    </div>
  );
}
