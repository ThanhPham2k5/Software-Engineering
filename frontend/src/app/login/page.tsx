import Footer from "@/components/footer/page";
import NavBar from "@/components/navbar/page";
import "@/styles/login.css";

export default function Login() {
  return (
    <div className="login">
      <NavBar disable={true} isLogined={false}></NavBar>
      <div className="body">
        <div className="body-background">
          <div className="body-title">BUS TO SCHOOL</div>

          <div className="body-email">
            <label htmlFor="email" className="body-email-label">
              email :
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="body-email-input"
            />
          </div>

          <div className="body-password">
            <label htmlFor="password" className="body-password-label">
              Mật khẩu :
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="body-password-input"
            />
          </div>

          <button type="button" className="body-button">
            ĐĂNG NHẬP
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
