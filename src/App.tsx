import Menu from "./components/Menu";
import Sequencer from "./pages/Sequencer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";
import {
  ColorModeContext,
  useThemeContext,
} from "./contexts/theme-mode-context";

function App() {
  const { mode, setMode, toggleColorMode } = useThemeContext();

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <CssBaseline />
      <Menu />
      <Sequencer />
    </ColorModeContext.Provider>
  );
}

export default App;
