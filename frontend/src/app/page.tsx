/* eslint-disable @next/next/no-img-element */
import NavBar from "@/components/navbar/page";
import "@/styles/navbar.css";
import Footer from "@/components/footer/page";
import "@/styles/footer.css";
import "@/styles/homepage.css";

export default function HomePage() {
  return (
    <>
      <div className="layout">
        <NavBar></NavBar>
        <div className="homepage">
          <img
            src="/homepage.svg"
            alt="homepage.png"
            className="homepage-img"
          />
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
