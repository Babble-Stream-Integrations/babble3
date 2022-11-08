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
      boxShadow: {
        babbleOuter:
          "3px 3px 4px -1px rgba(0,0,0,0.64), inset 3px 3px 4px -1px rgba(0,0,0,0.64)",
        babble: "3px 3px 4px -1px rgba(0,0,0,0.64)",
      },

      backdropBlur: {
        babble: "20px",
      },

      borderRadius: {
        babble: "25px",
        babbleSmall: "15px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      //add default babble colors
      colors: {
        //greys
        babbleBlack: "#0E0E10",
        babbleDarkerGray: "#1A1A1D",
        babbleDarkGray: "#212125",
        babbleGray: "#A8A8A8",
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
        tiktok: "#EE1D52",
        tiktokLight: "#EE1D52",
        tiktokDark: "#69C9D0",
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
      },
      animation: {
        "ping-short": "ping 0.7s linear 3",
        "fade-in-0": "fade-in 0.5s ease-in-out",
        "fade-in-1": "fade-in 0.75s ease-in-out",
        "fade-in-2": "fade-in 1s ease-in-out",
        "fade-in-text-0": "fade-text 0.5s ease-in-out",
        "fade-in-text-1": "fade-text 0.7s ease-in-out",
        "fade-in-text-2": "fade-text 0.9s ease-in-out",
        "fade-in-text-3": "fade-text 1.2s ease-in-out",
        "fade-in-up-0": "fade-in-up 0.5s ease-in-out",
        "fade-in-up-1": "fade-in-up 0.75s ease-in-out",
        "fade-in-up-2": "fade-in-up 1s ease-in-out",
        "fade-in-up-3": "fade-in-up 1.25s ease-in-out",
        "fade-in-up-4": "fade-in-up 1.5s ease-in-out",
        "fade-in-up-5": "fade-in-up 1.75s ease-in-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-text": {
          "0%": { transform: "translate3d(-100px, 0, 0)", opacity: 0 },
          "100%": { transform: "translate3d(0, 0, 0)", opacity: 1 },
        },
        "fade-in-up": {
          "0%": { transform: "translate3d(0, 30px, 0)", opacity: 0 },
          "100%": { transform: "translate3d(0, 0, 0)", opacity: 1 },
        },
      },
    },
  },
  //save classes from purging, so they can be used as variables.
  // example: `hover:from-${platform}Dark/10`
  safelist: [
    "tiktok",
    "twitch",
    "youtube",
    "hover:to-twitchDark/10",
    "hover:to-youtubeDark/10",
    "hover:to-tiktokDark/10",
    "to-twitchDark/10",
    "to-youtubeDark/10",
    "to-tiktokDark/10",
    "hover:from-twitchLight/30",
    "hover:from-youtubeLight/30",
    "hover:from-tiktokLight/30",
    "from-twitchLight/30",
    "from-youtubeLight/30",
    "from-tiktokLight/30",
    "hover:border-twitch",
    "hover:border-youtube",
    "hover:border-tiktok",
    "peer-checked:border-twitch",
    "peer-checked:border-youtube",
    "peer-checked:border-tiktok",
    "peer-checked:from-twitchLight/30",
    "peer-checked:from-youtubeLight/30",
    "peer-checked:from-tiktokLight/30",
    "peer-checked:to-twitchDark/10",
    "peer-checked:to-youtubeDark/10",
    "peer-checked:to-tiktokDark/10",
    "animate-fade-in-0",
    "animate-fade-in-1",
    "animate-fade-in-2",
    "animate-fade-in-3",
    "fade-in-up-0",
    "fade-in-up-1",
    "fade-in-up-2",
    "fade-in-up-3",
    "fade-in-up-4",
  ],
};
