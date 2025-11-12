/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import "@/styles/admin/shedule.css";
import NavBar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import { useParams, useRouter } from "next/navigation";
import CreateSchedule from "./create/page";
import ModifySchedule from "./modify/[id]/page";

export default function ShedulePage() {
  const [schedules, setShedule] = useState([]);
  const param = useParams();
  const router = useRouter();
  const account_id = param.account_id;
  const [validAccount, setValidAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAccount() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/accounts/${account_id}`
        );

        if (!response.ok) {
          setValidAccount(false);
          return;
        }

        const account = await response.json();
        if (account && account.Role === "Quản lý") {
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
  }, [account_id]);

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
              onClick={() => router.push(`/admin/${account_id}/main`)}
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
                      router.push(
                        `/admin/${account_id}/schedule/${schedule._id}`
                      )
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
