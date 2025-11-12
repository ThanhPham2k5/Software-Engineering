/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import "@/styles/admin/shedule.css";
import NavBar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import { useRouter } from "next/navigation";
import CreateSchedule from "./create/page";
import ModifySchedule from "./modify/[id]/page";

export default function ShedulePage() {
  const [schedules, setShedule] = useState([]);

  async function getScheduleFromDatabase() {
    const response = await fetch("http://localhost:8386/schedules");

    const data = await response.json();
    setShedule(data);
  }

  useEffect(() => {
    getScheduleFromDatabase();
  }, []);

  useEffect(() => {
    document.title = "Shedule Page";
  }, []);

  const router = useRouter();
  const id = 123;
  const [clickCreate, setClickCreate] = useState(false);
  const [clickModify, setClickModify] = useState(false);

  return (
    <>
      <NavBar disable={true} isLogined={true}></NavBar>

      <div className="Shedule">
        {clickCreate && (
          <CreateSchedule
            createProp={clickCreate}
            setCreateProp={setClickCreate}
          ></CreateSchedule>
        )}

        {clickModify && (
          <ModifySchedule
            modifyProp={clickModify}
            setModifyProp={setClickModify}
          ></ModifySchedule>
        )}

        <div className="Shedule-slogan">
          Đồng hành an toàn – Vững bước tương lai
        </div>

        <div className="Shedule-head">
          <div className="Shedule-title">Quản lý lịch trình</div>

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
        </div>

        <div className="Shedule-box">
          <div className="Shedule-tool">
            <div className="Shedule-searchbar">
              <input
                type="text"
                name="search"
                id="search"
                className="Schedule-bar"
              />

              <img
                src="/Schedule-search-ico.png"
                alt="Schedule-search-ico"
                className="Schedule-search-ico"
              />
            </div>

            <div className="Schedule-time">
              <div className="Schedule-from">
                <label className="Schedule-label" htmlFor="from">
                  Ngày bắt đầu :{" "}
                </label>
                <input
                  type="date"
                  name="from"
                  id="from"
                  className="Schedule-time-from"
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
                />
              </div>
            </div>
          </div>

          <div className="Shedule-list">
            {/* example item */}
            {schedules.map((schedule) => {
              return (
                <div className="Schedule-card" key={schedule._id}>
                  <div className="Schedule-id">{schedule._id}</div>

                  <div className="driver-name">
                    {schedule.DriverID.DriverName}
                  </div>

                  <div className="bus-id">{schedule.BusID.BusLicense}</div>

                  <img
                    src="/Schedule-inactive-ico.png"
                    alt="Schedule-status-ico"
                    className="Schedule-status-ico"
                  />

                  <img
                    src="/modify-button-ico.png"
                    alt="modify-menu-ico"
                    className="modify-menu-ico"
                    onClick={() => setClickModify(true)}
                  />

                  <img
                    src="/menu-button-ico.png"
                    alt="Schedule-menu-ico"
                    className="Schedule-menu-ico"
                    onClick={() =>
                      router.push(`/admin/schedule/${schedule._id}`)
                    }
                  />

                  <img
                    src="/Schedule-delete-ico.png"
                    alt="Schedule-delete-ico"
                    className="Schedule-delete-ico"
                  />
                </div>
              );
            })}
            {/* fake items */}
            <div className="Schedule-card">
              <div className="Schedule-id">LT-001</div>

              <div className="driver-name">Nguyễn Văn A</div>

              <div className="bus-id">36B-8386</div>

              <img
                src="/Schedule-active-ico.png"
                alt="Schedule-status-ico"
                className="Schedule-status-ico"
              />

              <img
                src="/menu-button-ico.png"
                alt="Schedule-menu-ico"
                className="Schedule-menu-ico"
              />

              <img
                src="/Schedule-delete-ico.png"
                alt="Schedule-delete-ico"
                className="Schedule-delete-ico"
              />
            </div>

            <div className="Schedule-card">
              <div className="Schedule-id">LT-001</div>

              <div className="driver-name">Nguyễn Văn A</div>

              <div className="bus-id">36B-8386</div>

              <img
                src="/Schedule-active-ico.png"
                alt="Schedule-status-ico"
                className="Schedule-status-ico"
              />

              <img
                src="/menu-button-ico.png"
                alt="Schedule-menu-ico"
                className="Schedule-menu-ico"
              />

              <img
                src="/Schedule-delete-ico.png"
                alt="Schedule-delete-ico"
                className="Schedule-delete-ico"
              />
            </div>

            <div className="Schedule-card">
              <div className="Schedule-id">LT-001</div>

              <div className="driver-name">Nguyễn Văn A</div>

              <div className="bus-id">36B-8386</div>

              <img
                src="/Schedule-active-ico.png"
                alt="Schedule-status-ico"
                className="Schedule-status-ico"
              />

              <img
                src="/menu-button-ico.png"
                alt="Schedule-menu-ico"
                className="Schedule-menu-ico"
              />

              <img
                src="/Schedule-delete-ico.png"
                alt="Schedule-delete-ico"
                className="Schedule-delete-ico"
              />
            </div>

            <div className="Schedule-card">
              <div className="Schedule-id">LT-001</div>

              <div className="driver-name">Nguyễn Văn A</div>

              <div className="bus-id">36B-8386</div>

              <img
                src="/Schedule-active-ico.png"
                alt="Schedule-status-ico"
                className="Schedule-status-ico"
              />

              <img
                src="/menu-button-ico.png"
                alt="Schedule-menu-ico"
                className="Schedule-menu-ico"
              />

              <img
                src="/Schedule-delete-ico.png"
                alt="Schedule-delete-ico"
                className="Schedule-delete-ico"
              />
            </div>

            <div className="Schedule-card">
              <div className="Schedule-id">LT-001</div>

              <div className="driver-name">Nguyễn Văn A</div>

              <div className="bus-id">36B-8386</div>

              <img
                src="/Schedule-active-ico.png"
                alt="Schedule-status-ico"
                className="Schedule-status-ico"
              />

              <img
                src="/menu-button-ico.png"
                alt="Schedule-menu-ico"
                className="Schedule-menu-ico"
              />

              <img
                src="/Schedule-delete-ico.png"
                alt="Schedule-delete-ico"
                className="Schedule-delete-ico"
              />
            </div>

            <div className="Schedule-card">
              <div className="Schedule-id">LT-001</div>

              <div className="driver-name">Nguyễn Văn A</div>

              <div className="bus-id">36B-8386</div>

              <img
                src="/Schedule-active-ico.png"
                alt="Schedule-status-ico"
                className="Schedule-status-ico"
              />

              <img
                src="/menu-button-ico.png"
                alt="Schedule-menu-ico"
                className="Schedule-menu-ico"
              />

              <img
                src="/Schedule-delete-ico.png"
                alt="Schedule-delete-ico"
                className="Schedule-delete-ico"
              />
            </div>

            <div className="Schedule-card">
              <div className="Schedule-id">LT-001</div>

              <div className="driver-name">Nguyễn Văn A</div>

              <div className="bus-id">36B-8386</div>

              <img
                src="/Schedule-active-ico.png"
                alt="Schedule-status-ico"
                className="Schedule-status-ico"
              />

              <img
                src="/menu-button-ico.png"
                alt="Schedule-menu-ico"
                className="Schedule-menu-ico"
              />

              <img
                src="/Schedule-delete-ico.png"
                alt="Schedule-delete-ico"
                className="Schedule-delete-ico"
              />
            </div>

            <div className="Schedule-card">
              <div className="Schedule-id">LT-001</div>

              <div className="driver-name">Nguyễn Văn A</div>

              <div className="bus-id">36B-8386</div>

              <img
                src="/Schedule-active-ico.png"
                alt="Schedule-status-ico"
                className="Schedule-status-ico"
              />

              <img
                src="/menu-button-ico.png"
                alt="Schedule-menu-ico"
                className="Schedule-menu-ico"
              />

              <img
                src="/Schedule-delete-ico.png"
                alt="Schedule-delete-ico"
                className="Schedule-delete-ico"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
