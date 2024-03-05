import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export const ColorModeContext = createContext({
  mode: "light" as "light" | "dark",
  setMode: (() => {}) as Dispatch<SetStateAction<"light" | "dark">>,
  toggleColorMode: () => {},
});

export const ColorModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  function toggleColorMode() {
    console.log("previous mode", mode);
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }

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
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export function useThemeContext() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error(
      "useTransport must be used within a TransportContextProvider"
    );
  }
  return context;
}
