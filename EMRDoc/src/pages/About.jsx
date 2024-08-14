import React from "react";
import green from "@assets/bg2.png";
import car1 from "@assets/doci1.png";
import car2 from "@assets/doci2.png";

export default function About() {
  return (
    <div
      className="mycontainer bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${green})` }}
    >
      <div className=" w-screen h-full flex flex-row overflow-hidden p-3">
        <div
          className="w-3/5 h-full p-14 text-justify text-lg font-bold text-sky-950 flex items-center flex-col"
          style={{
            backgroundColor: "rgba(255,255,255,0.4)",
            borderRadius: "20px 0 0 20px",
          }}
        >
          <h1 className="text-6xl p-12">About Us</h1>
          <h2 className="px-16">
            Welcome to E-Life EMR, your comprehensive solution for managing
            electronic medical records efficiently and securely. Our app is
            designed to streamline healthcare processes, improve patient care,
            and enhance data security.It allows healthcare providers to
            efficiently manage patient records, appointments, and medical
            history all in one place. With just a few clicks, you can access a
            patient’s full medical history, schedule and track appointments, and
            ensure continuity of care. We understand that ease of use is
            crucial. Our app features a user-friendly interface designed to make
            navigation and data entry as straightforward as possible, allowing
            healthcare providers to focus on what they do best—caring for
            patients.
          </h2>
        </div>
        <div
          className=" w-2/5 h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${car1})` }}
        ></div>
      </div>
    </div>
  );
}
