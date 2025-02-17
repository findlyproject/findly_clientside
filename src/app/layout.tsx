import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import StoreProvider from "@/lib/store/store-provider";
import SessionProvider from "@/providers/auth-provider";
import { getServerSession } from "next-auth";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Findly",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
          <ToastContainer
            autoClose={1000}
            position="bottom-right"
            hideProgressBar={true}
            closeOnClick 
            pauseOnHover
            draggable
            theme="colored"
            newestOnTop
            transition={Slide}
            toastStyle={{
              width: "auto",
              maxWidth: "90%",
              padding: "10px 20px",
              wordBreak: "break-word",
            }}
          />
        </StoreProvider>
      </body>
    </html>
  );
}
