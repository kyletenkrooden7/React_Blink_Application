import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate(); // Add useNavigate hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sandbox.blinkapi.co/v1/platform/user/login",
        {
          emailAddress: email,
          password: password,
          partnerId: "blink-travel"
        },
        {
          headers: {
            "x-api-key": "Zgz4NhoIqZ1PJ6vw49K9N9hdWB7dGnWD29kXxg7X"
          }
        }
      );
      const { accessToken } = response.data;
      //alert(accessToken);
      console.log(accessToken);
      onLogin(accessToken);
      navigate("/dashboard"); // Redirect to the Dashboard route
    } catch (error) {
      alert("Login Failed");
      console.error("Login failed:", error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="logo-container">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <input
        className="login-input"
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="login-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
