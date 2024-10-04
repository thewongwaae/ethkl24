import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
	title: "Login",
	description: "Login to application using WorldID",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
	<html lang="en">
	  <body
		className={`antialiased`}
	  >
		{children}
	  </ body>
	</ html>
  );
}
