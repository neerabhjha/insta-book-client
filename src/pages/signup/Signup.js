import React, { useState } from "react";
import "./Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
import { RxInstagramLogo } from "react-icons/rx";


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });

      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: "User created successfully",
        })
      );
      navigate('/login')
      
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="SignUp">
      <div className="signUpBox">
      <div className="main-title-div">
          <RxInstagramLogo className="main-title" />
          <h1 className="main-title">Instabook</h1>
        </div>
        <h2 className="heading">SignUp</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" className="submit" />
        </form>
        <p className="subHeading">
          Already have an account?{" "}
          <Link style={{ color: "gray" }} to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
