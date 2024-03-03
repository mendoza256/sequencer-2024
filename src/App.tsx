import { ThemeProvider } from "@emotion/react";
import Menu from "./components/Menu";
import Sequencer from "./pages/Sequencer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#7d83fd",
      main: "#646cff",
      dark: "#3f48f8",
      contrastText: "#fff",
    },
    secondary: {
      light: "#c1e3ff",
      main: "#74c0ff",
      dark: "#3884de",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <Sequencer />
    </ThemeProvider>
  );
}

export default App;
