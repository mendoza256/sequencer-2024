import Menu from "./components/Menu";
import Sequencer from "./pages/Sequencer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "./contexts/theme-mode-context";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { getDesignTokens } from "./utils/lightDarkMode";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  const domain = import.meta.env.VITE_AUTH_DOMAIN as string;
  const clientId = import.meta.env.VITE_AUTH_CLIENT_ID as string;
  const [mode, setMode] = useState<PaletteMode>("light");

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
      mode,
      setMode,
      theme,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Menu />
          <Sequencer />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Auth0Provider>
  );
}

export default App;
