/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
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
import { DefaultLayout } from "./layouts/defaultLayout";
import QuizSettings from "./components/quizComponent/quizSettings";

export default function App() {
  const [session] = useSessionStorageState("account", {
    defaultValue: {
      babbleToken: "",
    },
  });
  const PrivateRoutes = ({ children }: any) => {
    const auth = { token: session.babbleToken };
    if (!auth.token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const PublicRoutes = ({ children }: any) => {
    const auth = { token: session.babbleToken };
    if (auth.token) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoutes>
          <DefaultLayout title="Main Menu">
            <Home />
          </DefaultLayout>
        </PrivateRoutes>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoutes>
          <Login />
        </PublicRoutes>
      ),
    },
    {
      path: "/callback",
      element: <Callback />,
    },
    {
      path: "/quizStart",
      element: (
        <PrivateRoutes>
          <QuizStart />
        </PrivateRoutes>
      ),
    },
    {
      path: "/quiz",
      element: (
        <PrivateRoutes>
          <Quiz />
        </PrivateRoutes>
      ),
    },
    {
      path: "/quizResults",
      element: (
        <PrivateRoutes>
          <QuizResults />
        </PrivateRoutes>
      ),
    },
    {
      path: "/tutorial",
      element: (
        <PrivateRoutes>
          <Tutorial />
        </PrivateRoutes>
      ),
    },
    {
      path: "/settings",
      element: (
        <PrivateRoutes>
          <DefaultLayout
            title="Settings"
            subtitle="You can change these settings to make the game more to your liking."
          >
            <QuizSettings />
          </DefaultLayout>
        </PrivateRoutes>
      ),
    },
    {
      path: "/layout",
      element: (
        <DefaultLayout
          title="Settings"
          subtitle="You can change these settings to make the game more to your liking."
        >
          <QuizSettings />
        </DefaultLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
