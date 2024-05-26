import React from "react";
import green from "@assets/bg2.png";
import { Button } from "@mui/material";

export default function Product() {
  return (
    <div
      className="mycontainer bg-cover bg-center flex flex-row items-center justify-center gap-5"
      style={{ backgroundImage: `url(${green})` }}
    >
      <div className="h-4/6 w-1/5 bg-purple-500 rounded-2xl flex flex-col items-center justify-start p-10 py-14 gap-10 overflow-hidden">
        <h1 className="font-bold text-white text-3xl">Basic Plan</h1>
        <h1 className="font-bold text-white text-sm">Price: $29/month</h1>
        <div className="bg-white w-11/12 h-2/3 rounded-2xl p-5 flex justify-around items-center gap-5 flex-col overflow-hidden">
          <ul className="text-black text-xs list-disc font-bold">
            <li>Patient records & history</li>
            <li>Appointment scheduling</li>
            <li>Basic reporting</li>
            <li>Secure data storage</li>
            <li>Email support</li>
          </ul>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(147, 51, 234)" }}
          >
            See More
          </Button>
        </div>
      </div>
      <div className="h-4/5 w-3/12 bg-purple-600 rounded-2xl flex flex-col items-center justify-start p-10 py-14 gap-10 overflow-hidden">
        <h1 className="font-bold text-white text-4xl">Standard Plan</h1>
        <h1 className="font-bold text-white text-md">Price: $59/month</h1>
        <div className="bg-white w-11/12 h-2/3 rounded-2xl p-5 flex justify-around items-center gap-5 flex-col overflow-hidden">
          <ul className="text-black text-sm list-disc font-bold">
            <li>All Basic features</li>
            <li>Lab & imaging integration</li>
            <li>Prescription management</li>
            <li>Patient portal</li>
            <li>Customizable templates</li>
            <li>Priority support</li>
          </ul>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(147, 51, 234)" }}
          >
            See More
          </Button>
        </div>
      </div>
      <div className="h-4/6 w-1/5 bg-purple-500 rounded-2xl flex flex-col items-center justify-start p-10 py-14 gap-10 overflow-hidden">
        <h1 className="font-bold text-white text-3xl">Premium Plan</h1>
        <h1 className="font-bold text-white text-sm">Price: $99/month</h1>
        <div className="bg-white w-11/12 h-2/3 rounded-2xl p-5 flex justify-around items-center gap-5 flex-col overflow-hidden">
          <ul className="text-black text-xs list-disc font-bold">
            <li>All Standard features</li>
            <li>Advanced analytics</li>
            <li>Telehealth</li>
            <li>Automated reminders</li>
            <li>Multi-location support</li>
            <li>24/7 premium support</li>
          </ul>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(147, 51, 234)" }}
          >
            See More
          </Button>
        </div>
      </div>
    </div>
  );
}
