# 🚌 Smart School Bus Tracking System (SSB 1.0)

**Hệ thống Theo dõi Xe Đưa đón Học sinh Thông minh**

---

## 💡 Giới thiệu

**SSB 1.0** là một hệ thống được phát triển để quản lý và giám sát xe đưa đón học sinh một cách hiệu quả, giúp nâng cao an toàn và minh bạch thông tin.

Dự án này được Tổ chức **ABC** phát triển cho trường **DEF**.

### 🧐 Vấn đề

Hiện tại, việc quản lý xe buýt, phân công lịch trình, và thông báo vị trí cho phụ huynh thường được thực hiện **thủ công** (qua điện thoại, Excel/tin nhắn). Điều này dẫn đến nguy cơ:

- Trễ giờ, lạc đường.
- Thiếu thông tin vị trí theo thời gian thực (real-time).
- Gia tăng áp lực cho nhà trường và phụ huynh.

### ✨ Giải pháp

SSB 1.0 cung cấp một nền tảng tập trung để tự động hóa:

1.  **Quản lý:** Lên lịch và phân công tài xế/xe buýt.
2.  **Giám sát:** Cập nhật vị trí xe theo thời gian thực (Real-time Tracking).
3.  **Thông báo:** Cung cấp thông tin hành trình đồng bộ cho tất cả bên liên quan (Nhà trường, Tài xế, Phụ huynh).

---

## 🎯 Chức năng Chính

Hệ thống tập trung vào module **Bus Schedule & Tracking** với các chức năng cốt lõi sau:

| STT | Chức năng                       | Mô tả                                                                     |
| :-- | :------------------------------ | :------------------------------------------------------------------------ |
| 1   | **Quản lý Lịch trình**          | Tạo và cập nhật lịch trình xe buýt (theo tuần/tháng).                     |
| 2   | **Phân công Nguồn lực**         | Phân công tài xế, xe buýt cho từng tuyến đường đã lên lịch.               |
| 3   | **Theo dõi Vị trí (Real-time)** | Cập nhật vị trí của các xe buýt trên bản đồ với độ trễ tối đa **3 giây**. |

---

## 🛠 Công nghệ Sử dụng

- **Backend:** NestJS
- **Database:** MongoDB
- **Frontend (Web):** NextJS

---

## 🚀 Hướng dẫn Cài đặt

Thực hiện các bước sau để thiết lập và chạy dự án trên máy cục bộ của bạn.

### 1. Yêu cầu Tiên quyết

- Node.js v18+
- MongoDB Atlas

### 2. Clone Repository

```bash
git clone https://github.com/ThanhPham2k5/Software-Engineering.git
cd frontend
npm install
npm run dev
cd ..
cd backend
npm install
nest start --watch
```
