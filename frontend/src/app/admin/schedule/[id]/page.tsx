"use client";
/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/footer/page";
import NavBar from "@/components/navbar/page";
import "@/styles/admin/scheduledetail.css";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useState, useMemo, Fragment } from "react";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../../../components/map/page"), {
  ssr: false,
});

export default function ScheduleDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [scheduleDetail, setSheduleDetail] = useState();
  const [location, setLocation] = useState([]);

  useEffect(() => {
    async function getScheduleById() {
      const response = await fetch(`http://localhost:8386/schedules/${id}`);
      const data = await response.json();
      console.log(data.startTime);
      setSheduleDetail(data);
    }
    if (id) {
      getScheduleById();
    }
  }, [id]);

  useEffect(() => {
    async function getAllLocation() {
      console.log("ĐANG GỌI API CHO ID:", id);
      const response = await fetch(
        `http://localhost:8386/route-details/?routeid=${scheduleDetail.RouteID._id}`
      );
      const data = await response.json();
      console.log("KẾT QUẢ TỪ API:", data);
      setLocation(data);
    }
    if (id) {
      getAllLocation();
    }
  }, [scheduleDetail, id]);
  useEffect(() => {
    if (location) {
      console.log("location ĐÃ CẬP NHẬT:", location);
    }
  }, [location]);

  const cleanCoordinates = useMemo(() => {
    // 1. Sắp xếp mảng "location" GỐC
    const sortedLocation = [...location].sort((a, b) => a.Order - b.Order);

    // 2. Kiểm tra nếu mảng rỗng
    if (sortedLocation.length === 0) {
      return [];
    }

    // 3. Lấy điểm Bắt đầu của chặng ĐẦU TIÊN (Điểm A)
    const firstPoint = sortedLocation[0].LocationStartID;

    // 4. Lấy TẤT CẢ các điểm Kết thúc (Điểm B, C, ...)
    const endPoints = sortedLocation.map((detail) => detail.LocationEndID);

    // 5. Gộp lại để có [A, B, C, ...]
    const uniquePath = [firstPoint, ...endPoints];

    return uniquePath.map((loc) => [
      // (đổi tên 'location' thành 'loc')
      loc.LocationX,
      loc.LocationY,
    ]);
  }, [location]);

  console.log("Đã làm sạch:", cleanCoordinates);

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
      document.removeEventListener("mousedown", closeMap);
    };
  }, [showMap]);

  return (
    <>
      <NavBar disable={true} isLogined={true}></NavBar>

      <div className="detail">
        <div
          className="detail-map"
          style={{
            visibility: showMap ? "visible" : "hidden",
            opacity: showMap ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {/* put map here */}
          <div className="map" ref={mapRef}>
            {scheduleDetail && (
              <Map
                points={cleanCoordinates}
                startTime={scheduleDetail.startTime}
              />
            )}
          </div>
        </div>

        <div className="detail-header">
          <div className="detail-title">Chi tiết lịch trình</div>

          <div className="detail-buttons">
            <div
              className="detail-return-button"
              onClick={() => router.push("/admin/schedule")}
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
          {scheduleDetail && (
            <Fragment>
              <div className="detail-id">
                Mã lịch trình: {scheduleDetail._id}
              </div>

              <div className="detail-status">
                Trạng thái:
                <div className="status-color active">Đang hoạt động</div>
              </div>

              <div className="detail-route-name">
                Tuyến đường: {scheduleDetail.RouteID.RouteName}
              </div>

              <div className="detail-start-time">Giờ bắt đầu: 07:00 AM</div>

              <div className="detail-bus">
                Xe buýt: {scheduleDetail.BusID.BusLicense}
              </div>

              <div className="detail-driver">
                Tài xế: {scheduleDetail.DriverID.DriverName}
              </div>

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
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
