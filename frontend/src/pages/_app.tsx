import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
        <ToastContainer/>
        <Component {...pageProps} />
    </AuthProvider>
  )
}
