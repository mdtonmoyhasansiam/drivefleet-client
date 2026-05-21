import "./globals.css";

import {
  Toaster,
} from "react-hot-toast";

import AuthProvider
  from "@/providers/AuthProvider";

export const metadata = {
  title: "DriveFleet",
  description:
    "Car Rental Application",
};

export default function RootLayout({
  children,
}) {

  return (

    <html lang="en">

      <body>

        <AuthProvider>

          <Toaster
            position="top-right"
          />

          {children}

        </AuthProvider>

      </body>

    </html>
  );
}