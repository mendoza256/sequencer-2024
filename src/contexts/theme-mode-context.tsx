import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ColorModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        console.log("COLOR CHANGE");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            light: "#7d83fd",
            main: "#646cff",
            dark: "#3f48f8",
            contrastText: "#ffffffDE",
          },
          secondary: {
            light: "#c1e3ff",
            main: "#74c0ff",
            dark: "#3884de",
            contrastText: "#242424",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                color: "#ffffffDE",
                backgroundColor: "#242424",
                "& h1": {
                  color: "ffffffDE",
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
      {/* {children} */}
    </ColorModeContext.Provider>
  );
};
