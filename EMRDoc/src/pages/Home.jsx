import React from "react";
import "../styles/home.css";
import green from "@assets/blue3.png";
import logo from "@assets/IDMLOGODARK.png";
import { Input } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";

export default function Home() {
  return (
    <div
      className="mycontainer bg-cover bg-center flex-col items-center justify-between"
      style={{ backgroundImage: `url(${green})` }}
    >
      <div className="search justify-center items-center flex w-full h-full backdrop-blur-sm">
        <Input
          type="text"
          name="search"
          id="search"
          placeholder="Search here"
          className="w-8/12 h-12 bg-white rounded-xl p-5 border-gray-300 border-2"
        />
        <SearchRounded
          sx={{ fontSize: 30 }}
          className="text-black "
        ></SearchRounded>
      </div>
      <div className="content hide-scrollbar">
        <div className="left">
          <h4>
            Welcome to E-Life , your comprehensive solution for managing
            electronic medical records efficiently and securely. Our app is
            designed to streamline healthcare processes, improve patient care,
            and enhance data security.
          </h4>
        </div>

        <div className="main-content">
          <h4>
            Our EMR app allows healthcare providers to efficiently manage
            patient records, appointments, and medical history all in one place.
            With just a few clicks, you can access a patient’s full medical
            history, schedule and track appointments, and ensure continuity of
            care.
          </h4>
        </div>

        <div className="right">
          <h4>
            We understand that ease of use is crucial. Our app features a
            user-friendly interface designed to make navigation and data entry
            as straightforward as possible, allowing healthcare providers to
            focus on what they do best—caring for patients.
          </h4>
        </div>
      </div>
    </div>
  );
}
