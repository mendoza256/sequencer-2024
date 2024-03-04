import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ThemeToggle from "./ThemeToggle";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState("signUp");
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="fixed top-0 w-full flex justify-end gap-4 p-4">
        <ThemeToggle />
        <Button
          variant="contained"
          onClick={() => {
            setModal("signIn");
            setOpen(true);
          }}
        >
          Login
        </Button>
        <Button variant="contained">Logout</Button>
        <Button
          variant="contained"
          onClick={() => {
            setModal("signUp");
            setOpen(true);
          }}
        >
          Sign Up
        </Button>
        <Button variant="contained">Save Sequence</Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="bg-white p-4 rounded-md w-96 h-96 mx-auto mt-24"
      >
        <>
          {modal === "signIn" && <SignIn />}
          {modal === "signUp" && <SignUp />}
        </>
      </Modal>
    </>
  );
};

export default Menu;
