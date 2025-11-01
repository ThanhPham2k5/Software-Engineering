"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";

type NavBarProps = {
  disable: boolean;
  isLogined: boolean;
};

export default function NavBar({ isLogined, disable }: NavBarProps) {
  const [showUser, setShowUser] = useState(false);

  function checkShowUser() {
    setShowUser((prev) => !prev);
  }

  return (
    <div className="navbar">
      <Link href="/" className="navbar-left">
        <div className="navbar-left-brand">BUS TO SCHOOL</div>
        <img src="/logo.svg" alt="logo.png" className="navbar-left-logo" />
      </Link>

      <div className="navbar-right">
        {!disable ? (
          <Link href="/login">
            <button type="button" className="navbar-right-button">
              ĐĂNG NHẬP
            </button>
          </Link>
        ) : isLogined ? (
          <div className="user">
            <img
              src="/img-user-ico.png"
              alt="img-user-ico"
              className="img-user-ico"
              onClick={checkShowUser}
            />

            {showUser && (
              <div className="user-option">
                <Link href="/" className="logout-button">
                  <img
                    src="/logout-button-ico.png"
                    alt="logout-button-ico"
                    className="logout-button-ico"
                  />

                  <div className="logout-button-text">Đăng xuất</div>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar-right-hidden"></div>
        )}
      </div>
    </div>
  );
}
