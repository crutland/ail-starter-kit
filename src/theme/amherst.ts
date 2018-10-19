import { createMuiTheme } from "@material-ui/core";

const primary = {
  light: "#33a095",
  main: '#00897b',
  dark: "#005f56",
  contrastText: "#fff"
};

const secondary = {
  light: "#606dbb",
  main: '#3949ab',
  dark: "#273377",
  contrastText: "#fff"
};

const typography = { useNextVariants: true };

export const lightTheme = createMuiTheme({
  typography,
  palette: {
    primary,
    secondary
  }
});

export const darkTheme = createMuiTheme({
  typography,
  palette: {
    type: "dark",
    secondary: primary,
    primary: secondary
  }
});