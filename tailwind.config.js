/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    //change font family
    fontFamily: {
      sans: ["Gotham", "sans-serif"],
    },
    extend: {
      borderRadius: {
        babble: "15px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      //add default babble colors
      colors: {
        //greys
        babbleBlack: "#0E0E10",
        babbleDarkGray: "#1A1A1D",
        babbleGray: "#808085",
        babbleLightGray: "#E6E6E6",
        babbleWhite: "#F2F2F4",
        //colors
        babbleRed: "#FF0000",
        babbleOrange: "#FF8400",
        babbleYellow: "#FFC600",
        babbleDarkblue: "#0062FF",
        babbleBlue: "#007BFF",
        babbleLightblue: "#00F1FF",
        twitch: "#9146FF",
        twitchLight: "#9146FF",
        twitchDark: "#4503A8",
        youtube: "#FF0000",
        youtubeLight: "#FF2E2E",
        youtubeDark: "#B50B0B",
        //quizColors
        quizPinkLight: "#E42256",
        quizPinkDark: "#9F002B",
        quizGoldLight: "#FDC74C",
        quizGoldDark: "#A87603",
        quizTurqoiseLigt: "#00B1B0",
        quizTurqoiseDark: "#015E5E",
        quizBrownLight: "#FF8370",
        quizBrownDark: "#8F1B09",
        //varable colors
        platform: "var(--platform-color)",
        platformLight: "var(--platform-light)",
        platformDark: "var(--platform-dark)",
        ALight: "var(--A-light)",
        ADark: "var(--A-dark)",
        BLight: "var(--B-light)",
        BDark: "var(--B-dark)",
        CLight: "var(--C-light)",
        CDark: "var(--C-dark)",
        DLight: "var(--D-light)",
        DDark: "var(--D-dark)",
      },
      animation: {
        "ping-short": "ping 0.7s linear 3",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animation-delay")],
};
