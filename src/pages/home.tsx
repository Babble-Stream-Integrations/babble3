import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-radial from-[#2D2D31] via-[#1A1A1D] to-[#1A1A1D]">
      <span className="pt-4 text-babbleLightGray">HOME</span>
      <button
        className="mt-4 rounded-md bg-babbleBlue px-4 py-2 text-babbleWhite"
        onClick={() => navigate("/quizstart")}
      >
        go to Quiz
      </button>
      <button
        onClick={() => navigate("/settings")}
        className="mt-4 rounded-md bg-babbleBlue px-4 py-2 text-babbleWhite"
      >
        go to Settings
      </button>
    </div>
  );
}
