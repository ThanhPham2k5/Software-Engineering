/* eslint-disable @next/next/no-img-element */
"use client";

import "@/styles/admin/create.css";
import React, { useEffect, useRef, useState } from "react";

type showModify = {
  modifyProp: boolean;
  setModifyProp: React.Dispatch<React.SetStateAction<boolean>>;
  //XuanThien
  scheduleId: string | null;
  onScheduleModified: () => void;
};

interface Driver {
  _id: string;
  DriverName: string;
  DriverID: string;
}
interface Bus {
  _id: string;
  BusLicense: string;
}
interface Route {
  _id: string;
  RouteName: string;
}
interface Student {
  _id: string;
  StudentName: string;
  StudentID: string;
}

const initialFormState = {
  ManagerID: "",
  DriverID: "",
  BusID: "",
  RouteID: "",
  startTime: "",
  //StartDate: "",
  EndDate: "",
  Duration: 40,
  Students: [] as string[],
  Status: true,
};
//

export default function ModifySchedule({
  scheduleId,
  onScheduleModified,
  modifyProp,
  setModifyProp,
}: showModify) {
  const createRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function closeCreate(e: MouseEvent) {
      if (createRef.current && !createRef.current.contains(e.target as Node)) {
        setModifyProp(false);
      }
    }
    document.addEventListener("mousedown", closeCreate);
    return () => {
      document.removeEventListener("mousedown", closeCreate);
    };
  }, [modifyProp, setModifyProp]);

  // const [managers, setManagers] = useState<Manager[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Xuanthien
  useEffect(() => {
    if (modifyProp && scheduleId) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const [
            // managersRes,
            driversRes,
            busesRes,
            routesRes,
            studentsRes,
            scheduleRes,
            detailsRes,
          ] = await Promise.all([
            // fetch("http://localhost:8386/managers"),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/buses`),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/routes`),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/students`),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/${scheduleId}`),
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/schedule-details?scheduleid=${scheduleId}`
            ),
          ]);

          // setManagers(await managersRes.json());
          setDrivers(await driversRes.json());
          setBuses(await busesRes.json());
          setRoutes(await routesRes.json());
          setStudents(await studentsRes.json());

          const scheduleData = await scheduleRes.json();
          console.log("Dữ liệu lịch trình đang muốn thay đổi:", scheduleData);

          const detailsData = await detailsRes.json();
          type DetailItem = {
            StudentID: string | { _id: string };
          };

          const selectedStudentIds = detailsData.map((detail: DetailItem) =>
            typeof detail.StudentID === "object"
              ? detail.StudentID._id
              : detail.StudentID
          );

          console.log("Dữ liệu lịch trình:", scheduleData);
          console.log("Học sinh đã có trong lịch:", selectedStudentIds);
          const formatDate = (dateString: string) => {
            if (!dateString) return "";
            return new Date(dateString).toISOString().split("T")[0];
          };

          setFormData({
            ManagerID: scheduleData.ManagerID || "",
            DriverID: scheduleData.DriverID?._id || "",
            BusID: scheduleData.BusID?._id || "",
            RouteID: scheduleData.RouteID?._id || "",
            startTime: scheduleData.startTime || "",
            EndDate: formatDate(scheduleData.EndDate),
            Duration: scheduleData.Duration || 0,
            Students: selectedStudentIds || [],
            Status: scheduleData.Status,
          });
        } catch (err) {
          console.error("Lỗi khi tải dữ liệu:", err);
          setError("Không thể tải dữ liệu. Vui lòng thử lại.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [modifyProp, scheduleId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (e.target.type === "select-multiple") {
      const options = (e.target as HTMLSelectElement).options;
      const selectedValues: string[] = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }
      setFormData((prev) => ({ ...prev, [name]: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/schedules/${scheduleId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData), // Gửi trực tiếp formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Cập nhật lịch trình thất bại");
      }

      alert("Cập nhật lịch trình thành công!");
      setModifyProp(false); // Đóng form
      onScheduleModified(); // Refresh danh sách ở trang cha
    } catch (err: unknown) {
      console.error("Lỗi khi cập nhật:", err);
      let message = "Đã xảy ra lỗi không xác định";
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="Create">
        <div className="Create-form" ref={createRef}>
          <div className="Create-body">
            <div className="Create-title">Cập nhật lịch trình: </div>

            {loading && <div className="loading-text">Đang tải...</div>}
            {error && <div className="error-text">{error}</div>}

            <div className="Create-info">
              {/* --- CHỌN TÀI XẾ --- */}
              <div className="Create-driver">
                <label className="Create-label" htmlFor="driver">
                  Chọn tài xế:
                </label>
                <select
                  className="Create-select"
                  name="DriverID"
                  id="driver"
                  value={formData.DriverID}
                  onChange={handleChange}
                  disabled={loading}
                >
                  {drivers.map((driver) => (
                    <option key={driver._id} value={driver._id}>
                      {driver.DriverID} - {driver.DriverName}
                    </option>
                  ))}
                </select>
              </div>

              {/* --- CHỌN XE BUÝT --- */}
              <div className="Create-bus">
                <label className="Create-label" htmlFor="bus">
                  Chọn xe buýt:
                </label>
                <select
                  className="Create-select"
                  name="BusID"
                  id="bus"
                  value={formData.BusID}
                  onChange={handleChange}
                  disabled={loading}
                >
                  {buses.map((bus) => (
                    <option key={bus._id} value={bus._id}>
                      {bus.BusLicense}
                    </option>
                  ))}
                </select>
              </div>

              {/* --- CHỌN TUYẾN ĐƯỜNG --- */}
              <div className="Create-route">
                <label className="Create-label" htmlFor="route">
                  Chọn tuyến đường:
                </label>
                <select
                  className="Create-select"
                  name="RouteID"
                  id="route"
                  value={formData.RouteID}
                  onChange={handleChange}
                  disabled={loading}
                >
                  {routes.map((route) => (
                    <option key={route._id} value={route._id}>
                      {route.RouteName}
                    </option>
                  ))}
                </select>
              </div>

              {/* --- CHỌN GIỜ CHẠY --- */}
              <div className="Create-time">
                <label className="Create-label" htmlFor="time">
                  Chọn giờ chạy:
                </label>
                <input
                  type="time"
                  name="startTime"
                  id="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {/* --- NGÀY BẮT ĐẦU --- */}
              <div className="Create-from">
                <label className="Create-label" htmlFor="from">
                  Ngày bắt đầu:
                </label>
                <input
                  type="date"
                  name="StartDate"
                  id="from"
                  // value={formData.StartDate}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {/* --- NGÀY KẾT THÚC --- */}
              <div className="Create-to">
                <label className="Create-label" htmlFor="to">
                  Ngày kết thúc:
                </label>
                <input
                  type="date"
                  name="EndDate"
                  id="to"
                  value={formData.EndDate}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {/* --- DANH SÁCH HỌC SINH --- */}
              <div className="Create-list">
                <label className="Create-label" htmlFor="list">
                  Danh sách học sinh:
                </label>
                <select
                  multiple
                  name="Students"
                  id="list"
                  value={formData.Students}
                  onChange={handleChange}
                  disabled={loading}
                  // size={6}
                >
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student._id} - {student.StudentName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="Create-buttons">
              <div
                className="Create-cancel-button"
                onClick={() => setModifyProp(false)}
              >
                <img
                  src="/cancel-ico.png"
                  alt="cancel-ico"
                  className="cancel-ico"
                />
                <div className="cancel-text">Hủy</div>
              </div>
              <div
                className={`Create-done-button ${loading ? "disabled" : ""}`}
                onClick={!loading ? handleSubmit : undefined}
              >
                <img src="/done-ico.png" alt="done-ico" className="done-ico" />
                <div className="done-text">
                  {loading ? "Đang cập nhật..." : "Hoàn thành"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
