// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { IFirebaseConfig } from "./context/AuthContext";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase

export const initFirebase = (config: IFirebaseConfig) => {
  try {
    getApp();
  } catch (error) {
    return initializeApp(config);
  }
};

export const fireStoreApp = (config: IFirebaseConfig) => {
  return getFirestore(initializeApp(config));
};

export const storage = (config: IFirebaseConfig) =>
  getStorage(initializeApp(config));

export const realTime = (config: IFirebaseConfig) =>
  getDatabase(initializeApp(config));
