// import { ThemeProvider } from "@emotion/react";
import Menu from "./components/Menu";
import Sequencer from "./pages/Sequencer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "./contexts/theme-mode-context";
import { useContext } from "react";

// const theme = createTheme({
//   palette: {
//     primary: {
//       light: "#7d83fd",
//       main: "#646cff",
//       dark: "#3f48f8",
//       contrastText: "#ffffffDE",
//     },
//     secondary: {
//       light: "#c1e3ff",
//       main: "#74c0ff",
//       dark: "#3884de",
//       contrastText: "#242424",
//     },
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           color: "#ffffffDE",
//           backgroundColor: "#242424",
//           "& h1": {
//             color: "ffffffDE",
//           },
//         },
//       },
//     },
//   },
// });

function App() {
  const colorMode = useContext(ColorModeContext);

  return (
    <ColorModeContext.Provider value={colorMode}>
      {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <Menu />
      <Sequencer />
      {/* </ThemeProvider> */}
    </ColorModeContext.Provider>
  );
}

export default App;
