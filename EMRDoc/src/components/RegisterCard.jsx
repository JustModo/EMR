import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, FormControl } from "@mui/material";

export default function RegisterCard({ parentFunc }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    aadharno: "",
    fname: "",
    lname: "",
    phoneno: "",
    address: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="h-1/3 flex items-end justify-center flex-col">
        <h1 className="font-sans font-semibold text-3xl">Register</h1>
      </div>
      <div className="h-4/5 w-full flex items-center justify-around flex-row gap-5 flex-wrap">
        <form
          className="w-full flex items-center justify-around flex-row gap-5 flex-wrap"
          onSubmit={handleSubmit}
        >
          <TextField
            name="email"
            label="Email"
            variant="standard"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            variant="standard"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            name="aadharno"
            label="Aadhar No."
            variant="standard"
            type="number"
            required
            value={formData.aadharno}
            onChange={handleChange}
          />
          <TextField
            name="fname"
            label="First Name"
            variant="standard"
            required
            value={formData.fname}
            onChange={handleChange}
          />
          <TextField
            name="lname"
            label="Last Name"
            variant="standard"
            required
            value={formData.lname}
            onChange={handleChange}
          />
          <TextField
            name="phoneno"
            label="Phone No."
            variant="standard"
            type="number"
            required
            value={formData.phoneno}
            onChange={handleChange}
          />
          <TextField
            name="address"
            label="Address"
            variant="standard"
            fullWidth
            required
            value={formData.address}
            onChange={handleChange}
          />
          <div className="flex flex-col items-center w-full">
            <button className="btn btn-outline btn-secondary" type="submit">
              Register
            </button>
            <a className="cursor-pointer" onClick={() => parentFunc()}>
              Login
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
