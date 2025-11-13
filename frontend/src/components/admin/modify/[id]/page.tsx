"use client";
/* eslint-disable @next/next/no-img-element */
import "@/styles/admin/create.css";
import React, { useEffect, useRef } from "react";

type showModify = {
  modifyProp: boolean;
  setModifyProp: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModifySchedule({
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

  return (
    <>
      <div className="Create">
        <div className="Create-form" ref={createRef}>
          <div className="Create-body">
            <div className="Create-title">Cập nhật lịch trình: </div>

            <div className="Create-info">
              <div className="Create-driver">
                <label className="Create-label" htmlFor="driver">
                  Chọn tài xế:
                </label>

                <select className="Create-select" name="driver" id="driver">
                  {/* example */}
                  <option value="TX-01">TX-01 - Nguyễn Văn A</option>
                </select>
              </div>

              <div className="Create-bus">
                <label className="Create-label" htmlFor="bus">
                  Chọn xe buýt:
                </label>

                <select className="Create-select" name="bus" id="bus">
                  {/* example */}
                  <option value="36B-8386">36B-8386</option>
                </select>
              </div>

              <div className="Create-route">
                <label className="Create-label" htmlFor="route">
                  Chọn tuyến đường:
                </label>

                <select className="Create-select" name="route" id="route">
                  {/* example */}
                  <option value="TD-01">Đầm Sen - Đại học Sài Gòn</option>
                </select>
              </div>

              <div className="Create-time">
                <label className="Create-label" htmlFor="time">
                  Chọn giờ chạy:
                </label>

                <input type="time" name="time" id="time" />
              </div>

              <div className="Create-from">
                <label className="Create-label" htmlFor="from">
                  Ngày bắt đầu:
                </label>

                <input type="date" name="from" id="from" />
              </div>

              <div className="Create-to">
                <label className="Create-label" htmlFor="to">
                  Ngày kết thúc:
                </label>

                <input type="date" name="to" id="to" />
              </div>

              <div className="Create-list">
                <label className="Create-label" htmlFor="list">
                  Danh sách học sinh:
                </label>

                <select multiple name="list" id="list">
                  <option value="HS-01">HS-01 Nguyễn Văn A</option>
                  <option value="HS-01">HS-01 Nguyễn Văn A</option>
                  <option value="HS-01">HS-01 Nguyễn Văn A</option>
                  <option value="HS-01">HS-01 Nguyễn Văn A</option>
                  <option value="HS-01">HS-01 Nguyễn Văn A</option>
                  <option value="HS-01">HS-01 Nguyễn Văn A</option>
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

              <div className="Create-done-button">
                <img src="/done-ico.png" alt="done-ico" className="done-ico" />

                <div className="done-text">Hoàn thành</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
