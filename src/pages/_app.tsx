import "../styles/globals.css";
import { AuthProvider } from "../Contexts/AuthContext";
import ToastProvider from "@/Contexts/ToastContext";

function MyApp({ Component, pageProps }: any) {
  return (
    <AuthProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </AuthProvider>
  );
}

export default MyApp;
