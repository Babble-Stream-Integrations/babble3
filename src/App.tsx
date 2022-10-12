import React from "react";
import { Routes, Route } from "react-router-dom";
import "./global.css";
import Quiz from "./pages/quiz/quiz";
import Login from "./pages/login";
import QuizStart from "./pages/quiz/quizStart";
import QuizResults from "./pages/quiz/quizResults";
import AuthRoute from "./components/login/authRoute";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/quiz"
          element={
            <AuthRoute>
              <Quiz />
            </AuthRoute>
          }
        />
        <Route
          path="/quizstart"
          element={
            <AuthRoute>
              <QuizStart />
            </AuthRoute>
          }
        />
        <Route
          path="/quizresults"
          element={
            <AuthRoute>
              <QuizResults />
            </AuthRoute>
          }
        />
      </Routes>
    </div>
  );
}
