import React from "react";
import toast, { type Toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type ResolvableToast = {
  t: Toast;
  text: string;
  confirm: string;
  cancel: string;
  nav?: string;
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ResolvableToast({
  t,
  text,
  confirm,
  cancel,
  nav,
  setState,
}: ResolvableToast) {
  const navigate = useNavigate();
  return (
    <span className="flex flex-col pt-2 text-center">
      {text}
      <div className="flex justify-center gap-4 p-2">
        <button
          className="mt-2 rounded-xl bg-red-300 p-4 text-red-900"
          onClick={() => {
            toast.dismiss(t.id);
            setState && setState(false);
            nav && navigate(nav);
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
