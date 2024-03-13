import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { useThemeContext } from "../contexts/theme-mode-context";

export type ThemeContextType = {
  mode: string;
  toggleColorMode: () => void;
};

const ThemeToggle = () => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeContext() as ThemeContextType;

  console.log("mode", mode);
  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "100px",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
      }}
      onClick={toggleColorMode}
    >
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} color="inherit">
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
};

export default ThemeToggle;
