"use client";
/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/footer/page";
import NavBar from "@/components/navbar/page";
import "@/styles/admin/scheduledetail.css";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useState, useMemo, Fragment } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map/page"), {
  ssr: false,
});

type ScheduleDetail = {
  _id: string;
  RouteID: { _id: string; RouteName: string };
  BusID: { BusLicense: string };
  DriverID: { _id: string; DriverName: string };
  startTime: string;
  startDate: string;
  endDate: string;
  duration: number;
  Status: boolean;
};

type RouteDetail = {
  Order: number;
  LocationStartID: {
    LocationX: number;
    LocationY: number;
  };
  LocationEndID: {
    LocationX: number;
    LocationY: number;
  };
};

type StudentDetail = {
  _id: string;
  StudentID: {
    StudentID: string;
    StudentName: string;
    ParentID: {
      ParentName: string;
    };
  };
};

export default function ScheduleDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [scheduleDetail, setSheduleDetail] = useState<ScheduleDetail | null>(
    null
  );
  const [location, setLocation] = useState<RouteDetail[]>([]);
  const [validAccount, setValidAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //xt
  const [students, setStudents] = useState<StudentDetail[]>([]);
  //xt

  useEffect(() => {
    async function checkAccount() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        setValidAccount(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/accounts/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
          }
          setValidAccount(false);
          return;
        }

        const account = await response.json();
        if (account && account.role === "Quản lý") {
          setValidAccount(true);
          return;
        } else {
          setValidAccount(false);
        }
      } catch (error) {
        console.error("Lỗi kiểm tra tài khoản:", error);
        setValidAccount(false);
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true); //chờ
    checkAccount();
  }, []);

  useEffect(() => {
    if (!validAccount && !isLoading) {
      router.push("/login");
    }
  }, [validAccount, isLoading, router]);

  useEffect(() => {
    async function getScheduleById() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/schedules/${id}`
      );
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
      if (!scheduleDetail?.RouteID?._id) return;

      console.log("ĐANG GỌI API CHO ID:", id);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/route-details/?routeid=${scheduleDetail.RouteID._id}`
      );
      const data = await response.json();
      console.log("KẾT QUẢ TỪ API:", data);
      setLocation(data);
    }

    if (id && scheduleDetail) {
      getAllLocation();
    }
  }, [scheduleDetail, id]);

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

  useEffect(() => {
    async function getStudentsByScheduleId() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/schedule-details?scheduleid=${id}`
      );
      const data = await response.json();

      if (response.ok) {
        setStudents(data);
      } else {
        console.error("Lỗi khi tải danh sách học sinh:", data);
        setStudents([]);
      }
    }

    if (id && validAccount) {
      getStudentsByScheduleId();
    }
  }, [id, validAccount]);

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
          <div
            className="map"
            ref={mapRef}
            style={{
              width: "calc(100% - 20%)",
              margin: "10px auto",
              borderRadius: "12px",
            }}
          >
            {scheduleDetail && (
              <Map
                points={cleanCoordinates}
                startTime={scheduleDetail.startTime}
                duration={scheduleDetail.duration}
              />
            )}
          </div>
        </div>

        <div className="detail-header">
          <div className="detail-title">Chi tiết lịch trình</div>

          <div className="detail-buttons">
            <div
              className="detail-return-button"
              onClick={() => router.push(`/admin/schedule`)}
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
                Mã lịch trình:{" "}
                {scheduleDetail._id
                  .substring(scheduleDetail._id.length - 6)
                  .toUpperCase()}
              </div>

              <div className="detail-status">
                Trạng thái:
                <div
                  className={
                    scheduleDetail.Status === true
                      ? "status-color active"
                      : "status-color inactive"
                  }
                  title={
                    scheduleDetail.Status === true
                      ? "Đang hoạt động"
                      : "Ngưng hoạt động"
                  }
                >
                  {scheduleDetail.Status === true
                    ? "Đang hoạt động"
                    : "Ngưng hoạt động"}
                </div>
              </div>

              <div className="detail-route-name">
                Tuyến đường: {scheduleDetail.RouteID.RouteName}
              </div>

              <div className="detail-start-time">
                Giờ bắt đầu: {scheduleDetail.startTime}
              </div>

              <div className="detail-start-date">
                Ngày bắt đầu: {scheduleDetail.startDate}
              </div>

              <div className="detail-end-date">
                Ngày kết thúc: {scheduleDetail.endDate}
              </div>

              <div className="detail-bus">
                Xe buýt: {scheduleDetail.BusID.BusLicense}
              </div>

              <div className="detail-driver">
                Tài xế:{" "}
                {scheduleDetail.DriverID._id
                  .substring(scheduleDetail.DriverID._id.length - 6)
                  .toUpperCase()}{" "}
                - {scheduleDetail.DriverID.DriverName}
              </div>

              <div className="detail-students">
                <div className="student-title">Danh sách học sinh:</div>

                <div className="student-list">
                  {students.length === 0 && (
                    <div className="student-card-empty">
                      Không có học sinh nào trên tuyến này.
                    </div>
                  )}

                  {students.map((detail) => (
                    <div className="student-card" key={detail._id}>
                      <div className="student-id">
                        {detail.StudentID.StudentID}
                      </div>
                      <div className="student-name">
                        Em:{" "}
                        {detail.StudentID._id
                          .substring(detail.StudentID._id.length - 6)
                          .toUpperCase()}
                        - {detail.StudentID.StudentName}
                      </div>
                    </div>
                  ))}
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
