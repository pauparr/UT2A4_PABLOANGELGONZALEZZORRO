import type { ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#4150a4",
    },
    secondary: {
      main: "#ff005a",
    },
    warning: {
      main: "#f79802",
    },
    text: {
      primary: "#ffffff",
    },
    background: {
      default: "#121212", 
    },
    info: {
      main: "#2ab1ef",
    },
    success: {
      main: "#61b765",
    },
    divider: "rgba(131,100,100,0.12)",
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeightBold: 700, 
  },
};

export default themeOptions;
