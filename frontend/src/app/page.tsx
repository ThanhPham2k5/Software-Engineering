/* eslint-disable @next/next/no-img-element */
import NavBar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import "@/styles/homepage.css";

export default function HomePage() {
  return (
    <>
      <div className="layout">
        <NavBar disable={false} isLogined={false}></NavBar>
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
