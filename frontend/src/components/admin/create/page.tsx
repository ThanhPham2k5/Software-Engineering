/* eslint-disable @next/next/no-img-element */
"use client";
import "@/styles/admin/create.css";
import React, { useEffect, useRef, useState } from "react";

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

type showCreate = {
  createProp: boolean;
  setCreateProp: React.Dispatch<React.SetStateAction<boolean>>;
  onScheduleCreated: () => void; // callback
};

const initialFormState = {
  ManagerID: "691a705dfb91e929d6a4e8f3", // mã quản lí tui dùng tạm ở database máy tui / lúc code thay lại cái này
  DriverID: "",
  BusID: "",
  RouteID: "",
  startTime: "",
  // StartDate: "",
  // EndDate: "",
  Duration: 40,
  Students: [],
  Status: true,
};

export default function CreateSchedule({
  createProp,
  setCreateProp,
  onScheduleCreated,
}: showCreate) {
  const createRef = useRef<HTMLDivElement | null>(null);

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [formData, setFormData] = useState(initialFormState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function closeCreate(e: MouseEvent) {
      if (createRef.current && !createRef.current.contains(e.target as Node)) {
        setCreateProp(false);
      }
    }
    document.addEventListener("mousedown", closeCreate);
    return () => {
      document.removeEventListener("mousedown", closeCreate);
    };
  }, [createProp, setCreateProp]);

  useEffect(() => {
    if (createProp) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const [driversRes, busesRes, routesRes, studentsRes] =
            await Promise.all([
              fetch("http://localhost:8386/drivers"),
              fetch("http://localhost:8386/buses"),
              fetch("http://localhost:8386/routes"),
              fetch("http://localhost:8386/students"),
            ]);

          setDrivers(await driversRes.json());
          setBuses(await busesRes.json());
          setRoutes(await routesRes.json());
          setStudents(await studentsRes.json());
        } catch (err) {
          console.error("Lỗi khi tải dữ liệu form:", err);
          setError("Không thể tải dữ liệu. Vui lòng thử lại.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      setFormData(initialFormState);
    }
  }, [createProp]);

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
      const response = await fetch("http://localhost:8386/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Tạo lịch trình thất bại");
      }

      setCreateProp(false);
      onScheduleCreated();
    } catch (err: unknown) {
      console.error("Lỗi khi tạo lịch trình:", err);
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="Create">
        <div className="Create-form" ref={createRef}>
          <div className="Create-body">
            <div className="Create-title">Thêm lịch trình mới: </div>

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
                  <option value="">-- Chọn tài xế --</option>
                  {drivers.map((driver) => (
                    <option key={driver._id} value={driver._id}>
                      {driver._id
                        .substring(driver._id.length - 6)
                        .toUpperCase()}{" "}
                      - {driver.DriverName}
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
                  <option value="">-- Chọn xe buýt --</option>
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
                  <option value="">-- Chọn tuyến đường --</option>
                  {routes.map((route) => (
                    <option key={route._id} value={route._id}>
                      {route.RouteName}
                    </option>
                  ))}
                </select>
              </div>

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
                  //  value={formData.StartDate}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="Create-to">
                <label className="Create-label" htmlFor="to">
                  Ngày kết thúc:
                </label>
                <input
                  type="date"
                  name="EndDate"
                  id="to"
                  //     value={formData.EndDate}
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
                  //size={6}
                >
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.StudentID} - {student.StudentName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="Create-buttons">
              <div
                className="Create-cancel-button"
                onClick={() => setCreateProp(false)}
              >
                <img
                  src="/cancel-ico.png"
                  alt="cancel-ico"
                  className="cancel-ico"
                />
                <div className="cancel-text">Hủy</div>
              </div>

              <div
                // Vô hiệu hóa nút khi đang loading
                className={`Create-done-button ${loading ? "disabled" : ""}`}
                onClick={!loading ? handleSubmit : undefined}
              >
                <img src="/done-ico.png" alt="done-ico" className="done-ico" />
                <div className="done-text">
                  {loading ? "Đang xử lý..." : "Hoàn thành"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
