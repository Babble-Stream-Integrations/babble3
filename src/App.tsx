import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import useSessionStorageState from "use-session-storage-state";
import clsx from "clsx";
import { DefaultLayout } from "layouts/defaultLayout";
import Play from "pages/play";
import Login from "pages/login";
import QuizResults from "pages/quizResults";
import Tutorial from "pages/tutorial";
import Settings from "pages/settings";
import Callback from "pages/callback";
import Home from "pages/home";
import Feedback from "pages/feedback";
import ResolvableToast from "components/toasts/resolvableToast";
import "./global.css";

export default function App() {
  const [session] = useSessionStorageState("account", {
    defaultValue: {
      babbleToken: "",
      platform: "twitch",
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
  function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);
    return (
      <>
        <Toaster />
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 text-4xl font-bold text-babbleWhite">
          <h1>Sorry, something went wrong</h1>
          <button
            className={clsx(
              "rounded-md p-2 text-xl",
              session.platform === "youtube" ? " bg-youtube" : "bg-twitch"
            )}
          >
            <a href="/">Go back to home</a>
          </button>
          <button
            className={clsx(
              "rounded-md border-2 p-2 text-xl",
              session.platform === "youtube"
                ? " border-youtube"
                : "border-twitch"
            )}
            onClick={() => {
              toast.loading(
                (t) => (
                  <ResolvableToast
                    t={t}
                    text="Are you sure you want to reset all settings?"
                    confirm="Yes, reset all settings"
                    cancel="Nope, cancel"
                    func={() => {
                      localStorage.clear();
                      sessionStorage.clear();
                      window.location.href = "/login";
                    }}
                  />
                ),
                {
                  icon: <></>,
                  id: "reset",
                }
              );
            }}
          >
            Reset all settings
          </button>
        </div>
      </>
    );
  }

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
      errorElement: <ErrorBoundary />,
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
      path: "/play/quiz",
      element: (
        <>
          <Toaster />
          <PrivateRoutes>
            <Play />
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
            <DefaultLayout title="Winners">
              <QuizResults />
            </DefaultLayout>
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
