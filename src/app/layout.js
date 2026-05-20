import "./globals.css";

import { Toaster } from "react-hot-toast";

import AuthProvider from "@/providers/AuthProvider";

export const metadata = {
  title: "DriveFleet",
  description:
    "Car Rental Platform",
};

export default function RootLayout({
  children,
}) {

  return (
    <html lang="en">

      <body>

        <AuthProvider>

          {children}

          <Toaster />

        </AuthProvider>

      </body>

    </html>
  );
}