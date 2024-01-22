import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import TransportContextProvider from "./contexts/transport-context.tsx";
import Test from "./pages/Test.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="test" element={<Test />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TransportContextProvider>
      <RouterProvider router={router} />
    </TransportContextProvider>
  </React.StrictMode>
);
