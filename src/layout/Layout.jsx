/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Wiki Store",
  description: "WIki store online shopping",
  keywords: ["Wiki store", "Wikistore", "wiki", "store", "store wiki"],
  author: "Waqar Khan",
};

export default Layout;
