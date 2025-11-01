/* eslint-disable @next/next/no-img-element */
"use client";
import Footer from "@/components/footer/page";
import NavBar from "@/components/navbar/page";
import "@/styles/login.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  useEffect(() => {
    document.title = "Login Page";
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  function clickShow() {
    setShowPassword((prev) => !prev);
  }

  const router = useRouter();
  function checkLogin() {
    if (username === "admin" && password === "admin") {
      router.push("/admin/main");
      return;
    }
    if (username !== "admin") setValidUsername(false);
    else setValidUsername(true);
    if (password !== "admin") setValidPassword(false);
    else setValidPassword(true);
  }

  return (
    <div className="login">
      <NavBar disable={true} isLogined={false}></NavBar>
      <div className="body">
        <div className="body-background">
          <div className="Body-title">BUS TO SCHOOL</div>

          <div className="body-input">
            <div className="body-username">
              <label htmlFor="username" className="body-username-label">
                Username :
              </label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="false"
                className="body-username-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {!validUsername && (
              <div className="error">Username is not correct</div>
            )}

            <div className="body-password">
              <label htmlFor="password" className="body-password-label">
                Mật khẩu :
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="false"
                className="body-password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <img
                src={
                  showPassword
                    ? "/body-password-show.png"
                    : "/body-password-hidden.png"
                }
                alt="body-password-hidden"
                className="body-password-hidden"
                onClick={() => clickShow()}
              />
            </div>
            {!validPassword && (
              <div className="error">Password is not correct</div>
            )}
          </div>

          <button type="button" className="body-button" onClick={checkLogin}>
            ĐĂNG NHẬP
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
