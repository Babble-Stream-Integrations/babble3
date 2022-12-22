import toast, { type Toast } from "react-hot-toast";

type ResolvableToast = {
  t: Toast;
  text: string;
  confirm: string;
  cancel: string;
  func?: () => void;
};

export default function ResolvableToast({
  t,
  text,
  confirm,
  cancel,
  func,
}: ResolvableToast) {
  return (
    <span className="flex flex-col pt-2 text-center">
      {text}
      <div className="flex justify-center gap-4 p-2">
        <button
          className="mt-2 rounded-xl bg-red-300 p-4 text-red-900"
          onClick={() => {
            toast.dismiss(t.id);
            if (func) {
              func();
            }
          }}
        >
          {confirm}
        </button>
        <button
          className="mt-2 rounded-xl bg-green-300 p-4 text-green-800"
          onClick={() => toast.dismiss(t.id)}
        >
          {cancel}
        </button>
      </div>
    </span>
  );
}
