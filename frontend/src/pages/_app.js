import "@/styles/globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
