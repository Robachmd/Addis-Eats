import Header from "./(components)/(header)/header";
import Footer from "./(components)/(footer)/footer";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://your-real-domain.com"),
  title: {
    default: "Addis Eats | Ethiopian Food",
    template: "%s | Addis Eats",
  },
  description: "Discover Ethiopian dishes, traditional stews, tibs, kitfo, and fasting meals with Addis Eats.",
  openGraph: {
    title: "Addis Eats | Ethiopian Food",
    description: "Discover traditional Ethiopian food and explore our menu.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
