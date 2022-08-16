import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

//we are overriding the main theme
export const purpleTheme = createTheme({
  palete: {
    primary: {
      main: "#262254"
    },
    secondary: {
      main: "#543884"
    },
    error: {
      main: red.A400
    }
  }
});
