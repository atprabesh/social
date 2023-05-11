import { useState } from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import "./App.css";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import {
  FIREBASE_APIKEY,
  FIREBASE_AppID,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_DATABASEURL,
  FIREBASE_MESSAGEINGSENDERID,
  FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET,
} from "./utils/env";
import AuthProvider from "./context/AuthContext";
import AppRoutes from "./Routes/AppRoutes";

export const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  appId: FIREBASE_AppID,
  authDomain: FIREBASE_AUTHDOMAIN,
  databaseURL: FIREBASE_DATABASEURL,
  messagingSenderId: FIREBASE_MESSAGEINGSENDERID,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
};

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    (localStorage.getItem("theme-color") as "light" | "dark") ?? "light"
  );
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    localStorage.setItem("theme-color", nextColorScheme);
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <BrowserRouter>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            loader: "dots",
          }}
        >
          <AuthProvider firebaseConfig={firebaseConfig}>
            <Notifications />
            <AppRoutes />
          </AuthProvider>
        </MantineProvider>
      </BrowserRouter>
    </ColorSchemeProvider>
  );
}

export default App;
