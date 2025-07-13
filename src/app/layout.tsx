'use client'
import dynamic from 'next/dynamic';
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import React from "react";
import { StoreProvider } from "./StoreProvider";
import "./globals.css";
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
export const revalidate = 1;
const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto',
});
export default function RootLayout({ children }: {children: React.ReactNode}) {
	console.log("Root layout");  
	return (    
		<StoreProvider>
			<html lang="en">
				<body className={inter.className}>
					<ThemeProvider theme={theme}>
						{children}
					</ThemeProvider>
					<Analytics />
					<Toaster position="top-right" />
				</body>
			</html>
		</StoreProvider>
		);
}
