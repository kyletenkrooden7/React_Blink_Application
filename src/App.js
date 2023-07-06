import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";

const App = () => {
  const [accessToken, setAccessToken] = useState("");

  const handleLogin = (token) => {
    setAccessToken(token);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={<Dashboard accessToken={accessToken} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
