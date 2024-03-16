import Button from "@mui/material/Button";
import ThemeToggle from "./ThemeToggle";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";

const Menu = () => {
  // isAuthenticated, isLoading neeed?
  const { user, loginWithRedirect, logout } = useAuth0();

  function handleSaveSequence() {
    const userId = user?.sub;
    const sequence = JSON.parse(localStorage.getItem("sequence") || "[]");
    const sequenceName = prompt("Enter a name for this sequence");
    if (sequenceName) {
      fetch("http://localhost:8080/save-sequence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          sequenceName,
          sequence,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          alert("Sequence saved!");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <>
      <div className="fixed top-0 w-full flex justify-end gap-4 p-4">
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
        >
          <span>{user ? "Hi " + user?.given_name : "Hi there!"}</span>
        </Box>
        <ThemeToggle />
        {!user ? (
          <Button onClick={() => loginWithRedirect()} variant="contained">
            Login/Sign Up
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => () =>
              logout({ logoutParams: { returnTo: "http://localhost:5173/" } })}
          >
            Logout
          </Button>
        )}
        {user && (
          <Button variant="contained" onClick={handleSaveSequence}>
            Save Sequence
          </Button>
        )}
      </div>
    </>
  );
};

export default Menu;
