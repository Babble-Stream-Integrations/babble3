import { Link } from "react-router-dom";
import logo from "./assets/logo-small.png";

function App() {
  return (
    <header className="App-header bg-babbleBlack">
      <div className="flex h-screen flex-1 flex-col items-center justify-center">
        <Link to="/battle">
          <div className="rounded bg-gradient-to-bl from-babbleRed via-babbleOrange to-babbleYellow py-2 px-4 font-bold text-white">
            Start game
          </div>
        </Link>
      </div>
      <div className="absolute left-8 bottom-8">
        <img src={logo} className="h-10 w-10" alt="logo" />
      </div>
    </header>
  );
}

export default App;
