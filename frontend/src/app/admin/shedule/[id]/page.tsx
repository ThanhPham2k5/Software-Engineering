"use client";
/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/footer/page";
import NavBar from "@/components/navbar/page";
import "@/styles/admin/scheduledetail.css";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ScheduleDetailPage() {
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);

  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function closeMap(e: MouseEvent) {
      if (mapRef.current && !mapRef.current.contains(e.target as Node)) {
        setShowMap(false);
      }
    }

    document.addEventListener("mousedown", closeMap);

    return () => {
      document.addEventListener("mousedown", closeMap);
    };
  }, [showMap]);

  return (
    <>
      <NavBar disable={true} isLogined={true}></NavBar>

      <div className="detail">
        {showMap && (
          <div className="detail-map">
            {/* put map here */}
            <div className="map" ref={mapRef}>
              <div className="temp">nothing</div>
            </div>
          </div>
        )}

        <div className="detail-header">
          <div className="detail-title">Chi tiết lịch trình</div>

          <div className="detail-buttons">
            <div
              className="detail-return-button"
              onClick={() => router.push("/admin/shedule")}
            >
              <img
                src="/return-ico.png"
                alt="return-ico"
                className="return-ico"
              />

              <div className="return-text">Quay lại</div>
            </div>

            <div
              className="detail-show-button"
              onClick={() => setShowMap(true)}
            >
              <img
                src="/body-password-show.png"
                alt="show-ico"
                className="show-ico"
              />

              <div className="show-text">Theo dõi</div>
            </div>
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

                <div className="student-name">Em: Lê Văn A</div>

                <div className="student-parent">Cha mẹ: Huỳnh Thanh A</div>
              </div>

              {/* fake items */}
              <div className="student-card">
                <div className="student-id">HS-01</div>

                <div className="student-name">Em: Lê Văn A</div>

                <div className="student-parent">Cha mẹ: Huỳnh Thanh A</div>
              </div>

              <div className="student-card">
                <div className="student-id">HS-01</div>

                <div className="student-name">Em: Lê Văn A</div>

                <div className="student-parent">Cha mẹ: Huỳnh Thanh A</div>
              </div>

              <div className="student-card">
                <div className="student-id">HS-01</div>

                <div className="student-name">Em: Lê Văn A</div>

                <div className="student-parent">Cha mẹ: Huỳnh Thanh A</div>
              </div>

              <div className="student-card">
                <div className="student-id">HS-01</div>

                <div className="student-name">Em: Lê Văn A</div>

                <div className="student-parent">Cha mẹ: Huỳnh Thanh A</div>
              </div>

              <div className="student-card">
                <div className="student-id">HS-01</div>

                <div className="student-name">Em: Lê Văn A</div>

                <div className="student-parent">Cha mẹ: Huỳnh Thanh A</div>
              </div>

              <div className="student-card">
                <div className="student-id">HS-01</div>

                <div className="student-name">Em: Lê Văn A</div>

                <div className="student-parent">Cha mẹ: Huỳnh Thanh A</div>
              </div>

              <div className="student-card">
                <div className="student-id">HS-01</div>

                <div className="student-name">Em: Lê Văn A</div>

                <div className="student-parent">Cha mẹ: Huỳnh Thanh A</div>
              </div>

              <div className="student-card">
                <div className="student-id">HS-01</div>

                <div className="student-name">Em: Lê Văn A</div>

                <div className="student-parent">Cha mẹ: Huỳnh Thanh A</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
