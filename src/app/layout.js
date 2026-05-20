import "./globals.css";

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
          {children}
        </AuthProvider>

      </body>

    </html>
  );
}