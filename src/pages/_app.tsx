import "../styles/globals.css";
import { AuthProvider } from "../Contexts/AuthContext";

function MyApp({ Component, pageProps }: any) {
  return (
    <AuthProvider>
      <div className="bg-global-bg">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
