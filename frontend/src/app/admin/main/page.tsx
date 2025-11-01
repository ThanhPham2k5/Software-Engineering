"use client";
/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/footer/page";
import NavBar from "@/components/navbar/page";
import "@/styles/admin/main.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MainPage() {
  useEffect(() => {
    document.title = "Admin Page";
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function closeMenu(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) document.addEventListener("mousedown", closeMenu);

    return () => {
      if (showMenu) document.addEventListener("mousedown", closeMenu);
    };
  }, [showMenu]);

  return (
    <div className="main">
      <NavBar disable={true} isLogined={true}></NavBar>
      {!showMenu && (
        <div className="menu-button" onClick={() => setShowMenu(true)}>
          <img
            src="/menu-button-ico.png"
            alt="menu-button-ico"
            className="menu-button-ico"
          />
        </div>
      )}

      {showMenu && (
        <div className="menu" ref={menuRef}>
          <Link href="/admin/shedule" className="schedule">
            <img
              src="/shedule-ico.png"
              alt="schedule-ico"
              className="schedule-ico"
            />

            <div className="schedule-text">Lịch trình</div>
          </Link>
        </div>
      )}

      <div className="body">
        <div className="body-slogan">
          Đồng hành an toàn – Vững bước tương lai
        </div>
        <div className="body-title">Chào Mừng Trở Lại!</div>
        <div className="body-accountName">Admin@admin.bus.com</div>
        {/* <img src="/message.svg" alt="message.png" className="body-message" /> */}
      </div>
      <Footer></Footer>
    </div>
  );
}
