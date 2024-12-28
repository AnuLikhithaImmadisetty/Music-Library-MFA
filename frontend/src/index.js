import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Signup from "./components/Signup";
import { ContextProvider } from "./Context"; 
import { UserProvider } from "./UserContext";
// Import UserProvider and ContextProvider
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./components/Signin";


// Layout component to wrap the app with necessary providers
const AppLayout = () => {
  return (
    <div>
      <App />
    </div>
  );
};

// Define the app router for routing
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: (
      <div>
        error
      </div>
    ),
  },

  {
    path: "/signup",
    element: <Signup />,
    errorElement: (
      <div>
        error
      </div>
    ),
  },
  {
    path: "/login",
    element: <Signin />,
    errorElement: (
      <div>
        error
      </div>
    ),
  },
]);

// Render the app inside the root element with necessary providers
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ContextProvider>
        <RouterProvider router={appRouter} />
      </ContextProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
