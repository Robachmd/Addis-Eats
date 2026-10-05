
import Header from "./(components)/(header)/header";
import Footer from "./(components)/(footer)/footer";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
