import toast from "react-hot-toast";

import ResolvableToast from "./resolvableToast";

export default function resetLayoutToast({
  removeItem,
}: {
  removeItem: () => void;
}) {
  return toast.loading(
    (t) => (
      <ResolvableToast
        t={t}
        text="Are you sure you want to reset the layout?"
        confirm="Reset layout"
        cancel="Keep layout"
        func={() => {
          removeItem();
        }}
      />
    ),
    {
      icon: <></>,
      id: "reset",
    }
  );
}
