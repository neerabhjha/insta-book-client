import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
import { RxInstagramLogo } from "react-icons/rx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });

      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: "Login Successful",
        })
      );
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate("/");

     
    } catch (error) {
      console.log("error", error);
    }
  }

  async function demoLogin() {
    try {
      const response = await axiosClient.post("/auth/login", {
        email: "testUser@test.com",
        password: "1234",
      });

      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: "Login Successful",
        })
      );
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate("/");

      
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="Login">
      <div className="loginBox">
        <div className="main-title-div">
          <RxInstagramLogo className="main-title" />
          <h1 className="main-title">Instabook</h1>
        </div>
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
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
        <button type="submit" className="demo-btn" onClick={demoLogin}>
          Visit app here
        </button>
        <p className="subHeading">
          Don't have an account?{" "}
          <Link style={{ color: "gray" }} to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
