import logo from "./assets/logo-small.png";

function App() {
  return (
    <header className="App-header bg-babbleBlack">
      <div className="flex h-screen flex-1 flex-col items-center justify-center"></div>
      <div className="absolute left-8 bottom-8">
        <img src={logo} className="h-10 w-10" alt="logo" />
      </div>
    </header>
  );
}

export default App;
