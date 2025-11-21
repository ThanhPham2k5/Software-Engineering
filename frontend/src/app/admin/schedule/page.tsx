/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import "@/styles/admin/shedule.css";
import NavBar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import { useRouter } from "next/navigation";
import CreateSchedule from "../../../components/admin/create/page";
import ModifySchedule from "../../../components/admin/modify/[id]/page";

type Schedule = {
  _id: string;
  DriverID?: { DriverName: string };
  BusID?: { BusLicense: string };
  Status: boolean;
  startDate: string;
  endDate: string;
};

export default function ShedulePage() {
  const [schedules, setShedule] = useState<Schedule[]>([]);
  const router = useRouter();
  const [validAccount, setValidAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //xuanthien
  const [allSchedules, setAllSchedules] = useState<Schedule[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    null
  );

  //sau khi thêm startdate & enddate :
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  //
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

  async function getScheduleFromDatabase() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schedules`
    );
    const data = await response.json();
    //xuanthien
    setAllSchedules(data);
    //xuanthien
    setShedule(data);
  }

  useEffect(() => {
    getScheduleFromDatabase();
  }, []);

  useEffect(() => {
    document.title = "Shedule Page";
  }, []);

  const [clickCreate, setClickCreate] = useState(false);
  const [clickModify, setClickModify] = useState(false);

  //xuanthien

  useEffect(() => {
    let filtered = [...allSchedules];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (schedule) =>
          (schedule.DriverID?.DriverName || "").toLowerCase().includes(term) ||
          (schedule.BusID?.BusLicense || "").toLowerCase().includes(term) ||
          schedule._id.toLowerCase().includes(term)
      );
    }

    if (filterStartDate || filterEndDate) {
      const searchStart = filterStartDate
        ? new Date(filterStartDate)
        : new Date("1970-01-01");
      const searchEnd = filterEndDate
        ? new Date(filterEndDate)
        : new Date("2999-12-31");

      filtered = filtered.filter((schedule) => {
        const schedStart = new Date(schedule.startDate);
        const schedEnd = new Date(schedule.endDate);

        return schedStart <= searchEnd && schedEnd >= searchStart;
      });
    }

    setShedule(filtered);
  }, [searchTerm, filterStartDate, filterEndDate, allSchedules]);

  async function handleSoftDelete(scheduleId: string) {
    if (
      window.confirm("Bạn có chắc chắn muốn ngưng hoạt động lịch trình này?")
    ) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/schedules/${scheduleId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Status: false }),
          }
        );

        if (response.ok) {
          getScheduleFromDatabase();
        } else {
          alert("Cập nhật trạng thái thất bại. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật lịch trình:", error);
        alert("Đã xảy ra lỗi mạng.");
      }
    }
  }
  //xuanthien
  return (
    <>
      <NavBar disable={true} isLogined={true}></NavBar>

      <div className="Shedule">
        {clickCreate && (
          <CreateSchedule
            createProp={clickCreate}
            setCreateProp={setClickCreate}
            //xuanthien
            onScheduleCreated={getScheduleFromDatabase}
            //
          ></CreateSchedule>
        )}

        {clickModify && (
          <ModifySchedule
            modifyProp={clickModify}
            setModifyProp={setClickModify}
            scheduleId={selectedScheduleId}
            onScheduleModified={getScheduleFromDatabase}
          ></ModifySchedule>
        )}

        <div className="Shedule-slogan">
          Đồng hành an toàn – Vững bước tương lai
        </div>

        <div className="Shedule-head">
          <div className="Shedule-title">Quản lý lịch trình</div>

          <div className="Schedule-buttons">
            <div
              className="Shedule-add-button"
              onClick={() => setClickCreate(true)}
            >
              <img
                src="/shedule-ico.png"
                alt="add-button-ico"
                className="add-button-ico"
              />

              <div className="add-button-text">Thêm lịch trình</div>
            </div>

            <div
              className="Shedule-return-button"
              onClick={() => router.push(`/admin/main`)}
            >
              <img
                src="/return-ico.png"
                alt="return-ico"
                className="return-button-ico"
              />

              <div className="return-button-text">Quay lại</div>
            </div>
          </div>
        </div>

        <div className="Shedule-box">
          <div className="Shedule-tool">
            <div className="Shedule-searchbar" data-testid="Shedule-searchbar">
              <input
                type="text"
                name="search"
                id="search"
                className="Schedule-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <img
                src="/Schedule-search-ico.png"
                alt="Schedule-search-ico"
                className="Schedule-search-ico"
              />
            </div>

            <div className="Schedule-time" data-testid="Schedule-time">
              <div className="Schedule-from">
                <label className="Schedule-label" htmlFor="from">
                  Ngày bắt đầu :{" "}
                </label>

                <input
                  type="date"
                  name="from"
                  id="from"
                  className="Schedule-time-from"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                />
              </div>

              <div className="Schedule-to">
                <label className="Schedule-label" htmlFor="to">
                  Ngày kết thúc :{" "}
                </label>

                <input
                  type="date"
                  name="to"
                  id="to"
                  className="Schedule-time-to"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="Shedule-list" data-testid="Shedule-list">
            {/* example item */}

            {schedules.map((schedule) => {
              return (
                <div
                  className="Schedule-card"
                  key={schedule._id}
                  data-testid="Schedule-card"
                >
                  <div className="Schedule-id" title={schedule._id}>
                    {/* Cắt ngắn ID (lấy 6 ký tự cuối) */}
                    {schedule._id
                      .substring(schedule._id.length - 6)
                      .toUpperCase()}
                  </div>

                  <div className="driver-name">
                    {schedule.DriverID?.DriverName}
                  </div>

                  <div className="bus-id">{schedule.BusID?.BusLicense}</div>

                  <img
                    src={
                      schedule.Status === true
                        ? "/Schedule-active-ico.png"
                        : "/Schedule-inactive-ico.png"
                    }
                    alt="Schedule-status-ico"
                    className="Schedule-status-ico"
                    data-testid="Schedule-status-ico"
                  />

                  {/* <img

                    src="/modify-button-ico.png"

                    alt="modify-menu-ico"

                    className="modify-menu-ico"

                    onClick={() => {

                    setSelectedScheduleId(schedule._id);

                    setClickModify(true);            

              }}

                  /> */}

                  <img
                    data-testid="modify-button"
                    src="/modify-button-ico.png"
                    alt="modify-menu-ico"
                    className={`modify-menu-ico ${
                      schedule.Status === false ? "disabled" : ""
                    }`}
                    onClick={
                      schedule.Status === true
                        ? () => {
                            setSelectedScheduleId(schedule._id);

                            setClickModify(true);
                          }
                        : undefined
                    }
                  />

                  <img
                    src="/menu-button-ico.png"
                    alt="Schedule-menu-ico"
                    className="Schedule-menu-ico"
                    data-testid="Schedule-menu-ico"
                    onClick={() =>
                      router.push(`/admin/schedule/${schedule._id}`)
                    }
                  />

                  <img
                    src="/Schedule-delete-ico.png"
                    alt="Schedule-delete-ico"
                    data-testid="Schedule-delete-ico"
                    className={`Schedule-delete-ico ${
                      schedule.Status === false ? "disabled" : ""
                    }`}
                    onClick={
                      schedule.Status === true
                        ? () => handleSoftDelete(schedule._id)
                        : undefined
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
