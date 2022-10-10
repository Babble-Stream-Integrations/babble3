import React from "react";
import { Routes, Route } from "react-router-dom";
import "./global.css";
import Quiz from "./pages/quiz/quiz";
import Login from "./pages/login";
import QuizStart from "./pages/quiz/quizStart";
import QuizResults from "./pages/quiz/quizResults";
import Settings from "./pages/settings";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quizstart" element={<QuizStart />} />
        <Route path="/quizresults" element={<QuizResults />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}
