import { Center, Loader, Paper } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FirebaseError, getApp } from "firebase/app";
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { PropsWithChildren, createContext, useState } from "react";
import { initFirebase } from "../init-firebase";

interface ICreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
interface IAuthProvider {
  loginWithEmailPassword: (email: string, password: string) => Promise<void>;
  createUserWithEmail: (data: ICreateUser) => Promise<void>;
  onLogOut: () => void;
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
}

export interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface Props {
  firebaseConfig: IFirebaseConfig;
}

export const AuthContext = createContext<IAuthProvider | null>(null);

const AuthProvider: React.FC<PropsWithChildren<Props>> = (props) => {
  initFirebase(props.firebaseConfig);
  const auth = getAuth();
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  const loginWithEmailPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const error = err as FirebaseError;
      const errorMessage = error.message;
      showNotification({
        message: errorMessage,
        title: "Unable to login",
        color: "red",
      });
    }
  };

  //write a function to create a user with email,password,firstname and lastname in firebase

  const createUserWithEmail = async ({
    email,
    password,
    firstName,
    lastName,
  }: ICreateUser) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, {
        displayName: `${firstName.trim().replace(/\s+/g, " ")} ${lastName
          .trim()
          .replace(/\s+/g, " ")}`,
      });
    } catch (err) {
      const error = err as FirebaseError;
      const errorMessage = error.message;

      showNotification({
        message: errorMessage,
        title: "Unable to Sign up",
        color: "red",
      });
    }
  };

  onAuthStateChanged(auth, async (user) => {
    setIsReady(true);
    if (user) {
      setUser(user);
      setToken(await user.getIdToken());
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  });

  const onLogOut = () => {
    auth.signOut();
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        createUserWithEmail,
        loginWithEmailPassword,
        isLoggedIn,
        loading,
        onLogOut,
        user,
      }}
    >
      {getApp() && isReady ? (
        props.children
      ) : (
        <Paper>
          <Center>
            <Loader />
          </Center>
        </Paper>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
