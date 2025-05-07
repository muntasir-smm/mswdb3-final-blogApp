// client/src/pages/_app.js

import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-hot-toast";
import Layout from "@/components/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer position="top-right" />
      </Layout>
    </SessionProvider>
  );
}
