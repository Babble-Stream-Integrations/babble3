import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./global.css";
import Quiz from "./pages/quiz/quiz";
import Login from "./pages/login";
import QuizStart from "./pages/quiz/quizStart";
import QuizResults from "./pages/quiz/quizResults";
import Tutorial from "./pages/tutorial";
import Settings from "./pages/settings";
import useSessionStorageState from "use-session-storage-state";
import Callback from "./pages/callback";
import Home from "./pages/home";

export default function App() {
  const [session] = useSessionStorageState("account", {
    defaultValue: {
      babbleToken: "",
    },
  });
  const PrivateRoutes = () => {
    const auth = { token: session.babbleToken };
    return auth.token ? <Outlet /> : <Navigate to="/login" />;
  };
  const PublicRoutes = () => {
    const auth = { token: session.babbleToken };
    return auth.token ? <Navigate to="/" /> : <Outlet />;
  };

  {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/callback" element={<Callback />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/quizstart" element={<QuizStart />} />
              <Route path="/quizresults" element={<QuizResults />} />
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/home" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
