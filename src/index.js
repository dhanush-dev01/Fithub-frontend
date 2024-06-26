import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./Components/context/AuthContext";
import { UserChatContextProvider } from "./Components/context/UserChatContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <UserChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserChatContextProvider>
  </AuthContextProvider>
);
