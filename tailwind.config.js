/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    //change font family
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    extend: {
      //add default babble colors
      colors: {
        //greys
        babbleBlack: "#0E0E10",
        babbleDarkgray: "#1A1A1D",
        babbleGray: "#212125",
        babbleLightgray: "#D0D0D2",
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
        platform: "var(--platform-color)",
        platformLight: "var(--platform-light)",
        platformDark: "var(--platform-dark)",
      },
    },
  },
  plugins: [],
};
