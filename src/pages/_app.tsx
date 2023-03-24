import '../styles/globals.css'
import { AuthProvider } from '../Contexts/AuthContext';

function MyApp({ Component, pageProps }: any) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
