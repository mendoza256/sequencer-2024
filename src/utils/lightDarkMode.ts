import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            light: "#979bfd",
            main: "#7d83fd",
            dark: "#2c05ad",
            contrastText: "#fff",
          },
          secondary: {
            light: "#979bfd",
            main: "#7d83fd",
            dark: "#575bb1",
            contrastText: "#242424",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            light: "#575bb1",
            main: "#7d83fd",
            dark: "#979bfd",
            contrastText: "#242424",
          },
          secondary: {
            light: "#979bfd",
            main: "#7d83fd",
            dark: "#575bb1",
            contrastText: "#242424",
          },
        }),
  },
});
