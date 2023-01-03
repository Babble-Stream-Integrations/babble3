import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import ResolvableToast from "../../components/toasts/resolvableToast";

export default function QuitQuizToast({
  setStart,
  disconnect,
}: {
  setStart: (value: boolean) => void;
  disconnect: () => void;
}) {
  const navigate = useNavigate();
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
          navigate("/settings");
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
