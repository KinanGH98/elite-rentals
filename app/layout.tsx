import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "next-themes";
import ToastContainer from "@/app/ToastContainer";
import { LazyMotion, domAnimation } from "framer-motion"
import SidebarDrawer from "@/app/components/SidebarDrawer";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

export const metadata = {
    applicationName: 'Elite Rentals',
    authors: [{ name: 'Ahmed Kinan Ghbash' }],
    creator: 'Ahmed Kinan Ghbash',
    publisher: 'Ahmed Kinan Ghbash',
    keywords: [
        "car rentals",
        "luxury car rentals",
        "Elite Rentals",
        "car booking",
        "premium car rentals",
        "vehicle rentals",
        "affordable car hire",
        "rental cars near me",
        "high-end car rentals",
        "car rental service",
        "best car rental deals",
        "daily car rentals",
        "weekend car rentals",
        "long-term car rentals",
        "exclusive car rentals",
        "rent a car",
        "book a car online",
    ],
    
    openGraph: {
        title: "Elite Rentals",
        description: "Find your perfect car rental with Elite Rentals for your next adventure. Browse our vast selection of vehicles, from economy to luxury, and enjoy a seamless booking experience.",
        url: "https://elite-rentals-k.vercel.app",
        siteName: 'Elite Rentals',
        type: "website",
        images: [
            {
                url: "https://elite-rentals-k.vercel.app/images/social-media-image.jpg",
                alt: "Elite Rentals Social Media Image",
            },
        ],
    },
    
    twitter: {
        card: "summary_large_image",
        title: "Elite Rentals",
        description: "Find your perfect car rental with Elite Rentals for your next adventure. Browse our vast selection of vehicles, from economy to luxury, and enjoy a seamless booking experience.",
        images: ["https://elite-rentals-k.vercel.app/images/social-media-image.jpg"],
    },

    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            "max-snippet": 0,
            "max-image-preview": "none",
            "max-video-preview": 0,
        },
    },
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>)
{
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} antialiased 
        bg-gradient-to-r from-slate-50 to-gray-300
        dark:bg-none dark:bg-base-300`}>
        <ThemeProvider storageKey='elite_rentals_theme'>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col">
                    {/* Page content here */}
                    <LazyMotion strict features={domAnimation}>
                        <div className='flex flex-col min-h-screen'>{children}</div>
                    </LazyMotion>
                    <ToastContainer/>
                </div>
                <SidebarDrawer/>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}