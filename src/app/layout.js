
import Header from "./(components)/(header)/header";
import Footer from "./(components)/(footer)/footer";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className="min-h-screen flex flex-col">
        <Header/>
        <main className="flex-1">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
