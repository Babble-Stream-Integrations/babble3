import React from "react";
import { Routes, Route } from "react-router-dom";
import "./global.css";
import Quiz from "./pages/quiz";
import Login from "./pages/login";
import Test from "./pages/test";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}
