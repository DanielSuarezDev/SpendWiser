// Importa las funciones que necesitas de los SDKs que necesitas
import { initializeApp } from "firebase/app";
import { getAnalytics,isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de tu aplicación web de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBI7ltST6vgxgEcNHvwZe-WBiSHTy73czE",
  authDomain: "spendwiser-9b0b2.firebaseapp.com",
  projectId: "spendwiser-9b0b2",
  storageBucket: "spendwiser-9b0b2.appspot.com",
  messagingSenderId: "794128209373",
  appId: "1:794128209373:web:a6edc74990ddd73cc71234",
  measurementId: "G-C0MLMVRJPD"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { auth, db, analytics, app };