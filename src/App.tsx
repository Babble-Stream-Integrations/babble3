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
import { Toaster } from "react-hot-toast";

export default function App() {
  const [session] = useSessionStorageState("account", {
    defaultValue: {
      babbleToken: "",
    },
  });

  const PublicRoutes = ({ children }: { children: JSX.Element }) => {
    const auth = { token: session.babbleToken };
    if (auth.token) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const PrivateRoutes = ({ children }: { children: JSX.Element }) => {
    const auth = { token: session.babbleToken };
    if (auth.token) {
      return children;
    }
    return <Navigate to="/login" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Toaster />
          <PrivateRoutes>
            <DefaultLayout title="Main menu">
              <Home />
            </DefaultLayout>
          </PrivateRoutes>
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Toaster />
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        </>
      ),
    },
    {
      path: "/callback",
      element: (
        <>
          <Toaster />
          <Callback />
        </>
      ),
    },
    {
      path: "/quizStart",
      element: (
        <>
          <Toaster />
          <PrivateRoutes>
            <QuizStart />
          </PrivateRoutes>
        </>
      ),
    },
    {
      path: "/quiz",
      element: (
        <>
          <Toaster />
          <PrivateRoutes>
            <Quiz />
          </PrivateRoutes>
        </>
      ),
    },
    {
      path: "/quizResults",
      element: (
        <>
          <Toaster />
          <PrivateRoutes>
            <QuizResults />
          </PrivateRoutes>
        </>
      ),
    },
    {
      path: "/tutorial",
      element: (
        <>
          <Toaster />
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
        </>
      ),
    },
    {
      path: "/settings",
      element: (
        <>
          <Toaster />
          <PrivateRoutes>
            <DefaultLayout
              title="Settings"
              subtitle="You can change these settings to make the game more to your liking."
            >
              <Settings />
            </DefaultLayout>
          </PrivateRoutes>
        </>
      ),
    },
    {
      path: "/feedback",
      element: (
        <>
          <Toaster />
          <PrivateRoutes>
            <DefaultLayout
              title="Feedback"
              subtitle="Your feedback helps us improve the application. What would you like to share with us?"
            >
              <Feedback />
            </DefaultLayout>
          </PrivateRoutes>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
