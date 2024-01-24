import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import TransportContextProvider from "./contexts/transport-context.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SequenceContextProvider from "./contexts/sequence-context.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />}></Route>)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TransportContextProvider>
      <SequenceContextProvider>
        <RouterProvider router={router} />
      </SequenceContextProvider>
    </TransportContextProvider>
  </React.StrictMode>
);
