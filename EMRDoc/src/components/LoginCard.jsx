import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { TextField } from "@mui/material";

export default function LoginCard({ parentFunc }) {
  const { login } = useContext(AuthContext);

  function handlePress() {
    parentFunc();
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      login();
      console.log(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div className="h-1/3 flex items-end justify-center flex-col ">
        <h1 className="font-sans font-semibold text-3xl">Login</h1>
      </div>
      <form className="h-4/5 flex items-center justify-around flex-col gap-5 w-full">
        <TextField
          name="email"
          label="Email"
          variant="standard"
          required
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />
        <TextField
          name="password"
          label="Password"
          variant="standard"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
        />
        <div className="flex flex-col items-center bottom-10">
          <button
            className="btn btn-outline btn-secondary w-full"
            onClick={handleSubmit}
            type="submit"
          >
            Login
          </button>

          <a className="cursor-pointer" onClick={handlePress}>
            Register
          </a>
        </div>
      </form>
    </>
  );
}
