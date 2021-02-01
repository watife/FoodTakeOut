import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import * as firebase from "firebase";

import { ThemeProvider } from "styled-components/native";
import { View } from "react-native";

import {
  useFonts as useOpenSansFont,
  OpenSans_400Regular,
} from "@expo-google-fonts/open-sans";

import {
  useFonts as useRubikFont,
  Rubik_500Medium,
} from "@expo-google-fonts/rubik";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDt1PZyVUTlxZ1Ojma8GtCEJRpQpxufAbQ",
  authDomain: "foodtakeout-967eb.firebaseapp.com",
  projectId: "foodtakeout-967eb",
  storageBucket: "foodtakeout-967eb.appspot.com",
  messagingSenderId: "155966575832",
  appId: "1:155966575832:web:57650434c934b252d573ad",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  let [openSansLoaded] = useOpenSansFont({
    OpenSans_400Regular,
  });
  let [rubikLoaded] = useRubikFont({
    Rubik_500Medium,
  });

  if (!openSansLoaded || !rubikLoaded) {
    return <View />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
    </>
  );
}
