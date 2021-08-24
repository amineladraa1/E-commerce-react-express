import { createTheme } from "@material-ui/core/styles";

const lavendarBluch = "#EEE5E9";
const kellyGreen = "#63C132";
const lightGrey = "#7A918D";

const theme = createTheme({
  palette: {
    common: {
      pinkWhite: lavendarBluch,
      green: kellyGreen,
      grey: lightGrey,
    },
    primary: { main: "#0F0326" },
    secondary: { main: "#EEA243" },
  },
});

export default theme;
