import { createTheme, ThemeProvider } from "@mui/material/styles";

// https://colorhunt.co/palette/1c67583d8361d6cda4eef2e6

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2e9cff", // '#1C6758',
      light: "#3D8361",
    },
    secondary: {
      main: "#EEEEEE", // "#D6CDA4",
      light: "#EEF2E6",
    },
  },
});

export default theme;
