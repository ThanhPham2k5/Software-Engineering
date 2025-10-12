import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-left-brand">BUS TO SCHOOL</div>
        <img src="/logo.svg" alt="logo.png" className="navbar-left-logo" />
      </div>
      <div className="navbar-right">
        <Link href="/">
          <button type="button" className="navbar-right-button">
            SIGN IN
          </button>
        </Link>
      </div>
    </div>
  );
}
