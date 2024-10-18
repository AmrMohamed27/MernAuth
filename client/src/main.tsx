import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import HomeScreen from "./components/screens/HomeScreen";
import "./index.css";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import store from "./store";
import { Provider } from "react-redux";
import { Toaster } from "./components/ui/toaster";
import ProfileScreen from "./components/screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    // Layout
    <Route path="/" element={<App />}>
      {/* Home Page */}
      <Route index={true} path="/" element={<HomeScreen />}></Route>
      {/* Login Page */}
      <Route path="/login" element={<LoginScreen />}></Route>
      {/* Register Page */}
      <Route path="register" element={<RegisterScreen />}></Route>
      {/* Protected Routes */}
      <Route path="" element={<PrivateRoute />}>
        {/* Profile Page */}
        <Route path="/profile" element={<ProfileScreen />}></Route>
      </Route>
    </Route>,
  ),
);

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
        <Toaster />
      </React.StrictMode>
    </Provider>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
