import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDK_tnVan82kk-7dp31gmQQGSbbEl_d4Qg",
  authDomain: "social13-0712.firebaseapp.com",
  projectId: "social13-0712",
  storageBucket: "social13-0712.appspot.com",
  messagingSenderId: "763193478927",
  appId: "1:763193478927:web:a2f438aa9d6a7bacc2787a",
  measurementId: "G-HWKJ1TSVPL",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
// export const storage = getStorage(firebaseApp);
export const analytics = getAnalytics();

export const logOut = async () => {
  console.log("logging out");
  const auth = getAuth();
  await signOut(auth);
};
