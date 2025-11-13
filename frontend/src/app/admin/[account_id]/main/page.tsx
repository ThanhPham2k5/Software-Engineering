"use client";
/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/footer/page";
import NavBar from "@/components/navbar/page";
import "@/styles/admin/main.css";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function MainPage() {
  useEffect(() => {
    document.title = "Admin Page";
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const param = useParams();
  const router = useRouter();
  const account_id = param.account_id;
  const [validAccount, setValidAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAccount() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/accounts/${account_id}`
        );

        if (!response.ok) {
          setValidAccount(false);
          return;
        }

        const account = await response.json();
        if (account && account.Role === "Quản lý") {
          setValidAccount(true);
          return;
        } else {
          setValidAccount(false);
        }
      } catch (error) {
        console.error("Lỗi kiểm tra tài khoản:", error);
        setValidAccount(false);
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true); //chờ
    checkAccount();
  }, [account_id]);

  useEffect(() => {
    if (!validAccount && !isLoading) {
      router.push("/login");
    }
  }, [validAccount, isLoading, router]);

  useEffect(() => {
    function closeMenu(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) document.addEventListener("mousedown", closeMenu);

    return () => {
      if (showMenu) document.removeEventListener("mousedown", closeMenu);
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
          <Link href={`/admin/${account_id}/schedule`} className="schedule">
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
