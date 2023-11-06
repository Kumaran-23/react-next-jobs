import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./component/Header";
import ReduxProvider from "../../store/ReduxProvider";
import Alert from "./component/Alert";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Find your next job!",
  description: "Get your dream job here!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />
          <Alert />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
