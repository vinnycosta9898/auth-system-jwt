import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <ToastContainer/>
        <Component {...pageProps} />
    </>
  )
}
