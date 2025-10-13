import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
type NavBarProps = {
  disable: boolean;
  isLogined: boolean;
};

export default function NavBar({ isLogined, disable }: NavBarProps) {
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
          <div className=""></div>
        ) : (
          <div className="navbar-right-hidden"></div>
        )}
      </div>
    </div>
  );
}
