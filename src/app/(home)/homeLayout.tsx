'use client'
import Footer from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Home Layout");

    return (    
      <div className="h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar/>

          {children}

          <Footer />
        </ThemeProvider>
      </div>
    );
}
