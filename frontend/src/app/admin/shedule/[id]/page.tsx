/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/footer/page";
import NavBar from "@/components/navbar/page";
import "@/styles/admin/scheduledetail.css";

export default function ScheduleDetailPage() {
  return (
    <>
      <NavBar disable={true} isLogined={true}></NavBar>

      <div className="detail">
        <div className="detail-header">
          <div className="detail-title">Chi tiết lịch trình</div>

          <div className="detail-return-button">
            <img
              src="/return-ico.png"
              alt="return-ico"
              className="return-ico"
            />

            <div className="return-text">Quay lại</div>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-id">Mã lịch trình: LT-001</div>

          <div className="detail-status">
            Trạng thái:
            <div className="status-color active">Đang hoạt động</div>
          </div>

          <div className="detail-route-name">
            Tuyến đường: Đầm Sen - Đại học Sài Gòn
          </div>

          <div className="detail-start-time">Giờ bắt đầu: 07:00 AM</div>

          <div className="detail-bus">Xe buýt: 36B-8386</div>

          <div className="detail-driver">Tài xế: (T1-32AL) Nguyễn Văn A</div>

          <div className="detail-students">
            <div className="student-title">Danh sách học sinh:</div>

            <div className="student-list">
              {/* example item */}
              <div className="student-card">
                <div className="student-id">HS-01</div>

                <div className="student-name">Lê Văn A</div>

                <div className="student-parent">Huỳnh Thanh A</div>
              </div>

              {/* fake items */}
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
