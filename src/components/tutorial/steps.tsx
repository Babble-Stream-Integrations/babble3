import type { Step } from "react-joyride";

export const homeSteps: Step[] = [
  {
    title: "Welcome to Babble!",
    content: "text 1",
    target: "#tutorial",
    placement: "center",
    disableBeacon: true,
    styles: {
      options: {
        arrowColor: "none",
      },
      spotlight: {
        backgroundColor: "none",
      },
    },
  },
  {
    title: "Settings",
    content: "settings text",
    target: "#settings",
    placement: "right",
    disableBeacon: true,
  },

  {
    title: "Play Game",
    content: "play text",
    target: "#play",
    placement: "right",
    disableBeacon: true,
  },
];

export const settingsSteps: Step[] = [
  {
    title: "Category",
    content: "Category text",
    target: "#category",
    placement: "right",
    disableBeacon: true,
  },
  {
    title: "Amount of questions",
    content: "Amount text",
    target: "#amount",
    placement: "right",
    disableBeacon: true,
  },
  {
    title: "Difficulty",
    content: " Difficulty text",
    target: "#difficulty",
    placement: "right",
    disableBeacon: true,
  },
  {
    title: "Time to answer",
    content: "Time text",
    target: "#time",
    placement: "right",
    disableBeacon: true,
  },
];

export const playSteps: Step[] = [
  {
    title: "chatComponent",
    content: "chatComponent text",
    target: "#chatComponent",
    placement: "right",
    disableBeacon: true,
  },
  {
    title: "quizComponent",
    content: "quizComponent text",
    target: "#quizComponent",
    placement: "right",
    disableBeacon: true,
  },
  {
    title: "announcementFeedComponent",
    content: "announcementFeedComponent text",
    target: "#announcementFeedComponent",
    placement: "auto",
    disableBeacon: true,
  },
  {
    title: "edit",
    content: "Please click on the icon",
    target: "#edit",
    placement: "right",
    disableBeacon: true,
    spotlightClicks: true,
  },
  {
    title: "move",
    content: "move text",
    target: "#move",
    disableBeacon: true,
    spotlightClicks: true,
  },
  {
    title: "resize",
    content: "try to resize this component",
    target: ".react-grid-item > .react-resizable-handle",
    spotlightClicks: true,
    disableBeacon: false,
    placementBeacon: "top",
    placement: "right-end",
  },
  {
    title: "Reset Grid",
    content: "reset grid text",
    target: "#reset",
    placement: "right",
    disableBeacon: true,
    spotlightClicks: true,
  },
  {
    title: "fullscreen",
    content: "fullscreen text",
    target: "#fullscreen",
    placement: "right",
    disableBeacon: true,
    spotlightClicks: true,
  },
  {
    title: "Home",
    content: "home text",
    target: "#home",
    placement: "right",
    disableBeacon: true,
  },
  {
    title: "Settings",
    content: "settings text",
    target: "#settings",
    placement: "right",
    disableBeacon: true,
  },
  {
    title: "Play Game",
    content: "play text",
    target: "#play",
    placement: "right",
    disableBeacon: true,
    spotlightClicks: true,
  },
];

export const tutorialSteps: Step[] = [
  {
    title: "Welcome to Babble!",
    content: "text 1",
    target: "#tutorial",
    placement: "center",
  },
];
