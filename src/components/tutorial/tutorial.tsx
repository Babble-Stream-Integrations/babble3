import { useEffect } from "react";
import ReactJoyride, { ACTIONS, EVENTS, STATUS, Step } from "react-joyride";
import { useLocation } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import type { CallBackProps } from "react-joyride";

type Props = {
  steps: Step[];
};

export default function Tutorial({ steps }: Props) {
  //get the current page
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  const [run, setRun] = useLocalStorageState("tutorial", {
    defaultValue: {
      [page]: {
        initialRun: true,
        active: false,
        step: 0,
      },
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

  function callBack(data: CallBackProps) {
    const { action, index, status, type } = data;
    if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      // Update state to advance the tour
      setRun((prevState) => ({
        ...prevState,
        [page]: {
          ...prevState[page],
          step: index + (action === ACTIONS.PREV ? -1 : 1),
        },
      }));
    }
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      // Need to set our running state to false, so we can restart if we click start again.
      setRun((prevState) => ({
        ...prevState,
        [page]: {
          ...prevState[page],
          initialRun: false,
          active: false,
          step: 0,
        },
      }));
    }
    if (action === "skip") {
      setRun((prevState) => ({
        ...prevState,
        [page]: {
          ...prevState[page],
          active: false,
          step: 0,
        },
      }));
    }
    if (action === "close") {
      setRun((prevState) => ({
        ...prevState,
        [page]: {
          ...prevState[page],
          active: false,
          step: prevState[page].step - 1,
        },
      }));
    }
  }

  //wait 2 seconds before showing tutorial if initialrun is true
  useEffect(() => {
    //only show the steps after all animations have been loaded
    setRun((prevState) => ({
      ...prevState,
      [page]: {
        ...prevState[page],
        active: false,
      },
    }));
    if (run[page].initialRun) {
      setTimeout(() => {
        setRun((prevState) => ({
          ...prevState,
          [page]: {
            ...prevState[page],
            active: true,
          },
        }));
      }, 2000);
    }
  }, []);
  console.log(steps[run[page].step]);
  return (
    <ReactJoyride
      continuous={true}
      disableOverlayClose={true}
      showProgress={true}
      showSkipButton={true}
      steps={steps}
      run={run[page].active}
      stepIndex={run[page].step}
      debug={true}
      styles={{
        options: {
          primaryColor: "var(--platform-color)",
          arrowColor: "var(--platform-color)",
          backgroundColor: "#212125",
          textColor: "#F2F2F4",
        },
      }}
      callback={(data) => callBack(data)}
    />
  );
}
