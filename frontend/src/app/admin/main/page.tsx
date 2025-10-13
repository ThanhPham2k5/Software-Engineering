/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/footer/page";
import NavBar from "@/components/navbar/page";
import "@/styles/admin/main.css";

export default function MainPage() {
  return (
    <div className="main">
      <NavBar disable={true} isLogined={true}></NavBar>
      <div className="body">
        <div className="body-slogan">
          Đồng hành an toàn – Vững bước tương lai
        </div>
        <div className="body-title">Chào Mừng Trở Lại!</div>
        <div className="body-accountName">Admin@admin.bus.com</div>
        <img src="/message.svg" alt="message.png" className="body-message" />
      </div>
      <Footer></Footer>
    </div>
  );
}
