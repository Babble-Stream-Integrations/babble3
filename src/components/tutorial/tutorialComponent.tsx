import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { DefaultButton } from "components/defaultButton/defaultButton";

export default function TutorialComponent({
  setTutorial,
}: {
  setTutorial: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const [run, setRun] = useLocalStorageState("tutorial", {
    defaultValue: {
      "": {
        initialRun: true,
        active: false,
        step: 0,
      },
      settings: {
        initialRun: true,
        active: false,
        step: 0,
      },
      play: {
        initialRun: true,
        active: false,
        step: 0,
      },
    },
  });

  const tutorialOptions = [
    {
      name: "homescreen tutorial",
      id: "",
      route: "/",
    },
    {
      name: "quiz tutorial",
      id: "play",
      route: "/play/quiz",
    },
    {
      name: "settings tutorial",
      id: "settings",
      route: "/settings",
    },
  ];
  return (
    <div className="absolute left-0 right-0 z-50 mx-auto flex h-96 w-[500px] flex-col items-center gap-6 rounded-babble border-2 border-platform bg-babbleDarkerGray p-4 text-xl font-bold text-white">
      <h2>What tutorial do you want to follow?</h2>
      <div className="flex flex-col gap-8 pt-4">
        {tutorialOptions.map((options, index) => {
          return (
            <DefaultButton
              key={index}
              text={options.name}
              buttonClick={() => {
                setRun({
                  ...run,
                  [options.id]: {
                    initialRun: true,
                    active: true,
                    step: 0,
                  },
                });
                setTutorial(false);
                navigate(options.route);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
