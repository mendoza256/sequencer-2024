import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            light: "#7d83fd",
            main: "#646cff",
            dark: "#3f48f8",
            contrastText: "#ffffffDE",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            light: "#c1e3ff",
            main: "#74c0ff",
            dark: "#3884de",
            contrastText: "#242424",
          },
        }),
  },
});
