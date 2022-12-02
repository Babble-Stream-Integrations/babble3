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
import Feedback from "./pages/feedback";
import { DefaultLayout } from "./layouts/defaultLayout";

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
          <DefaultLayout title="Main menu">
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
          <DefaultLayout title="Winners">
            <QuizResults />
          </DefaultLayout>
        </PrivateRoutes>
      ),
    },
    {
      path: "/tutorial",
      element: (
        <PrivateRoutes>
          <DefaultLayout
            title="Tutorial"
            subtitle="When you hit the 'Play Game' button your chat will be loaded in and the games can begin!
A series of 10 trivia questions will appear on screen. You and your chat can answer by typing the corresponding letter in the chatbox. Keep in mind that you will get rewarded with points. Answering fast and scoring combo's will give you extra!
When the game is over you'll be able to see how everyone performed."
          >
            <Tutorial />
          </DefaultLayout>
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
            <Settings />
          </DefaultLayout>
        </PrivateRoutes>
      ),
    },
    {
      path: "/feedback",
      element: (
        <PrivateRoutes>
          <DefaultLayout
            title="Feedback"
            subtitle="Your feedback helps us improve the application. What would you like to share with us?"
          >
            <Feedback />
          </DefaultLayout>
        </PrivateRoutes>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
