import toast from "react-hot-toast";
import ResolvableToast from "./resolvableToast";

export default function QuitQuizToast({
  setStart,
  disconnect,
  navigate,
  path,
}: {
  setStart: (value: boolean) => void;
  disconnect: () => void;
  navigate: (path: string) => void;
  path: string;
}) {
  return toast.loading(
    (t) => (
      <ResolvableToast
        t={t}
        text="Are you sure you want to quit?"
        confirm="Quit"
        cancel="Continue"
        func={() => {
          setStart(false);
          disconnect();
          navigate(path);
          //add this page to the history so the user can go back to it
        }}
      />
    ),
    {
      icon: <></>,
      id: "exit",
    }
  );
}
