/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import Login from "@/app/login/page";

// Giả lập navbar và footer để tránh xung đột khi render
jest.mock("../src/components/footer/page.tsx", () => {
  return function MockFooter() {
    return <div data-testid="mock-footer" />;
  };
});

jest.mock("../src/components/navbar/page.tsx", () => {
  return function MockNavBar() {
    return <div data-testid="mock-navbar" />;
  };
});

// Giả lập thư viện navigation (useRouter)
const mockPush = jest.fn();
jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: mockPush,
    }),
  };
});

describe("Kiểm thử giao diện trang đăng nhập:", () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_API_URL = "http://mock-api.com";
  });

  beforeEach(() => {
    fetchMock.resetMocks();
    mockPush.mockClear();
  });

  it("1. Kiểm tra các thành phần giao diện:", () => {
    render(<Login />);

    // Lấy các thành phần
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Mật khẩu/i);
    const icoButton = screen.getByAltText("body-password-hidden");
    const submitButton = screen.getByText(/ĐĂNG NHẬP/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(icoButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("2. Kiểm tra người dùng nhập thông tin", async () => {
    const user = userEvent.setup();
    render(<Login />);

    // Lấy các thành phần
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Mật khẩu/i);
    const icoButton = screen.getByAltText("body-password-hidden");

    await user.clear(usernameInput);
    await user.type(usernameInput, "nva@manager.bus.edu.vn");
    expect(usernameInput).toHaveValue("nva@manager.bus.edu.vn");

    await user.clear(passwordInput);
    await user.type(passwordInput, "manager@123");
    expect(passwordInput).toHaveValue("manager@123");

    await user.click(icoButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(icoButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("3. Kiểm tra người dùng đăng nhập thành công", async () => {
    global.fetch = fetchMock as any;
    const user = userEvent.setup();
    render(<Login />);

    // Lấy các thành phần
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Mật khẩu/i);
    const submitButton = screen.getByText(/ĐĂNG NHẬP/i);

    await user.clear(usernameInput);
    await user.type(usernameInput, "nva@manager.bus.edu.vn");

    await user.clear(passwordInput);
    await user.type(passwordInput, "manager@123");

    // Tạo tài khoản và API phản hồi giả
    const mockAccount = { Account_id: 12345 };
    fetchMock.mockResponseOnce(JSON.stringify(mockAccount), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

    await user.click(submitButton);
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith(`/admin/12345/main`);
    });
  });

  it("4. Kiểm tra người dùng đăng nhập thất bại", async () => {
    global.fetch = fetchMock as any;
    const user = userEvent.setup();
    render(<Login />);

    // Lấy các thành phần
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Mật khẩu/i);
    const submitButton = screen.getByText(/ĐĂNG NHẬP/i);

    await user.clear(usernameInput);
    await user.type(usernameInput, "error_username");

    await user.clear(passwordInput);
    await user.type(passwordInput, "error_password");

    // Tạo API phản hồi giả
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Invalid credentials" }),
      {
        status: 401,
        headers: { "content-type": "application/json" },
      }
    );

    await user.click(submitButton);
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(mockPush).not.toHaveBeenCalled();

      const usernameError = screen.getByText("Username is not correct");
      const passwordError = screen.getByText("Password is not correct");

      expect(usernameError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });
});
