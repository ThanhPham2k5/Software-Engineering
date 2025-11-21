/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import ShedulePage from "@/app/admin/schedule/page";
import ScheduleDetailPage from "@/app/admin/schedule/[id]/page";
import CreateSchedule from "@/components/admin/create/page";
import ModifySchedule from "@/components/admin/modify/[id]/page";

const mockSchedules = [
  {
    _id: "691ff06e7845656d154f3d1a",
    ManagerID: "691ff06e7845656d154f3cff",
    DriverID: {
      _id: "691ff06e7845656d154f3d01",
      DriverName: "Nguyễn Đức Thắng",
      Gender: "Nam",
      Phone: "0123456789",
      Address: "27 Tân Bình, Bình Trị Đông, TPHCM",
      AccountID: "691ff06e7845656d154f3cfc",
      __v: 0,
      createdAt: "2025-11-21T04:54:06.280Z",
      updatedAt: "2025-11-21T04:54:06.280Z",
    },
    BusID: {
      _id: "691ff06e7845656d154f3d0d",
      BusLicense: "1234-ABCD",
      Capacity: 40,
      Status: true,
      __v: 0,
      createdAt: "2025-11-21T04:54:06.591Z",
      updatedAt: "2025-11-21T04:54:06.591Z",
    },
    RouteID: {
      _id: "691ff06e7845656d154f3d13",
      RouteName: "Đại học Sài Gòn - Bệnh viện Chợ Rẫy",
      Status: true,
      __v: 0,
      createdAt: "2025-11-21T04:54:06.716Z",
      updatedAt: "2025-11-21T04:54:06.716Z",
    },
    Duration: 30,
    startTime: "12:20",
    startDate: "2025-01-01",
    endDate: "2025-05-30",
    Status: true,
    __v: 0,
    createdAt: "2025-11-21T04:54:06.843Z",
    updatedAt: "2025-11-21T04:54:06.843Z",
  },
];

const mockScheduleDetail = [
  {
    _id: "69200ba3b52a1bfac3747bc7",
    ScheduleID: "691ff06e7845656d154f3d1a",
    StudentID: {
      _id: "69200ba3b52a1bfac3747baf",
      StudentName: "Phạm Phu Quân",
      Gender: "Nam",
      Address: "27 Tân Bình, Bình Trị Đông, TPHCM",
      ParentID: "69200ba3b52a1bfac3747bad",
      __v: 0,
      createdAt: "2025-11-21T06:50:11.635Z",
      updatedAt: "2025-11-21T06:50:11.635Z",
    },
    Status: true,
    __v: 0,
    createdAt: "2025-11-21T06:50:11.816Z",
    updatedAt: "2025-11-21T06:50:11.816Z",
  },
  {
    _id: "69200ba3b52a1bfac3747bc8",
    ScheduleID: "691ff06e7845656d154f3d1a",
    StudentID: {
      _id: "69200ba3b52a1bfac3747bb0",
      StudentName: "Phạm Phu Quân 1",
      Gender: "Nam",
      Address: "27 Tân Bình, Bình Trị Đông, TPHCM",
      ParentID: "69200ba3b52a1bfac3747bad",
      __v: 0,
      createdAt: "2025-11-21T06:50:11.635Z",
      updatedAt: "2025-11-21T06:50:11.635Z",
    },
    Status: true,
    __v: 0,
    createdAt: "2025-11-21T06:50:11.816Z",
    updatedAt: "2025-11-21T06:50:11.816Z",
  },
  {
    _id: "69200ba3b52a1bfac3747bc9",
    ScheduleID: "691ff06e7845656d154f3d1a",
    StudentID: {
      _id: "69200ba3b52a1bfac3747bb1",
      StudentName: "Phạm Phu Quân 2",
      Gender: "Nam",
      Address: "27 Tân Bình, Bình Trị Đông, TPHCM",
      ParentID: "69200ba3b52a1bfac3747bad",
      __v: 0,
      createdAt: "2025-11-21T06:50:11.635Z",
      updatedAt: "2025-11-21T06:50:11.635Z",
    },
    Status: true,
    __v: 0,
    createdAt: "2025-11-21T06:50:11.816Z",
    updatedAt: "2025-11-21T06:50:11.816Z",
  },
];

const mockDrivers = [
  {
    _id: "69200ba3b52a1bfac3747bab",
    DriverName: "Nguyễn Đức Thắng",
    Gender: "Nam",
    Phone: "0123456789",
    Address: "27 Tân Bình, Bình Trị Đông, TPHCM",
    AccountID: "69200ba3b52a1bfac3747ba6",
    __v: 0,
    createdAt: "2025-11-21T06:50:11.624Z",
    updatedAt: "2025-11-21T06:50:11.624Z",
  },
];

const mockBuses = [
  {
    _id: "69200ba3b52a1bfac3747bb7",
    BusLicense: "1234-ABCD",
    Capacity: 40,
    Status: true,
    __v: 0,
    createdAt: "2025-11-21T06:50:11.723Z",
    updatedAt: "2025-11-21T06:50:11.723Z",
  },
];

const mockRoutes = [
  {
    _id: "69200ba3b52a1bfac3747bbd",
    RouteName: "Đại học Sài Gòn - Bệnh viện Chợ Rẫy",
    Status: true,
    __v: 0,
    createdAt: "2025-11-21T06:50:11.734Z",
    updatedAt: "2025-11-21T06:50:11.734Z",
  },
  {
    _id: "69200ba3b52a1bfac3747bbe",
    RouteName: "test",
    Status: true,
    __v: 0,
    createdAt: "2025-11-21T06:50:11.734Z",
    updatedAt: "2025-11-21T06:50:11.734Z",
  },
];

const mockStudents = [
  {
    _id: "69200ba3b52a1bfac3747baf",
    StudentName: "Phạm Phu Quân",
    Gender: "Nam",
    Address: "27 Tân Bình, Bình Trị Đông, TPHCM",
    ParentID: "69200ba3b52a1bfac3747bad",
    __v: 0,
    createdAt: "2025-11-21T06:50:11.635Z",
    updatedAt: "2025-11-21T06:50:11.635Z",
  },
  {
    _id: "69200ba3b52a1bfac3747bb0",
    StudentName: "Phạm Phu Quân 1",
    Gender: "Nam",
    Address: "27 Tân Bình, Bình Trị Đông, TPHCM",
    ParentID: "69200ba3b52a1bfac3747bad",
    __v: 0,
    createdAt: "2025-11-21T06:50:11.635Z",
    updatedAt: "2025-11-21T06:50:11.635Z",
  },
  {
    _id: "69200ba3b52a1bfac3747bb1",
    StudentName: "Phạm Phu Quân 2",
    Gender: "Nam",
    Address: "27 Tân Bình, Bình Trị Đông, TPHCM",
    ParentID: "69200ba3b52a1bfac3747bad",
    __v: 0,
    createdAt: "2025-11-21T06:50:11.635Z",
    updatedAt: "2025-11-21T06:50:11.635Z",
  },
];

const mockManagers = [
  {
    _id: "69200ba3b52a1bfac3747ba9",
    ManagerName: "Nguyễn Văn An",
    Gender: "Nam",
    Phone: "0123456789",
    Address: "27 Tân Bình, Bình Trị Đông, TPHCM",
    AccountID: "69200ba3b52a1bfac3747ba5",
    __v: 0,
    createdAt: "2025-11-21T06:50:11.620Z",
    updatedAt: "2025-11-21T06:50:11.620Z",
  },
];

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
  useParams() {
    return {
      id: "691ff06e7845656d154f3d1a",
    };
  },
}));

describe("Test schedule page", () => {
  beforeEach(() => {
    fetchMock.resetMocks();

    fetchMock.mockResponse((req) => {
      if (req.method === "GET") {
        return Promise.resolve(JSON.stringify(mockSchedules));
      }
      if (req.method === "PATCH") {
        return Promise.resolve(JSON.stringify({ message: "Success" }));
      }
      return Promise.resolve(JSON.stringify(null));
    });
  });

  it("Test render full page", async () => {
    const mockSchedules = [
      {
        _id: "691ff06e7845656d154f3d1a",
        ManagerID: "691ff06e7845656d154f3cff",
        DriverID: {
          _id: "691ff06e7845656d154f3d01",
          DriverName: "Nguyễn Đức Thắng",
          Gender: "Nam",
          Phone: "0123456789",
          Address: "27 Tân Bình, Bình Trị Đông, TPHCM",
          AccountID: "691ff06e7845656d154f3cfc",
          __v: 0,
          createdAt: "2025-11-21T04:54:06.280Z",
          updatedAt: "2025-11-21T04:54:06.280Z",
        },
        BusID: {
          _id: "691ff06e7845656d154f3d0d",
          BusLicense: "1234-ABCD",
          Capacity: 40,
          Status: true,
          __v: 0,
          createdAt: "2025-11-21T04:54:06.591Z",
          updatedAt: "2025-11-21T04:54:06.591Z",
        },
        RouteID: {
          _id: "691ff06e7845656d154f3d13",
          RouteName: "Đại học Sài Gòn - Bệnh viện Chợ Rẫy",
          Status: true,
          __v: 0,
          createdAt: "2025-11-21T04:54:06.716Z",
          updatedAt: "2025-11-21T04:54:06.716Z",
        },
        Duration: 30,
        startTime: "12:20",
        startDate: "2025-01-01",
        endDate: "2025-05-30",
        Status: true,
        __v: 0,
        createdAt: "2025-11-21T04:54:06.843Z",
        updatedAt: "2025-11-21T04:54:06.843Z",
      },
      {
        _id: "691ff06e7845656d154f3d1b",
        ManagerID: "691ff06e7845656d154f3cff",
        DriverID: {
          _id: "691ff06e7845656d154f3d01",
          DriverName: "Nguyễn Đức Thắng",
          Gender: "Nam",
          Phone: "0123456789",
          Address: "27 Tân Bình, Bình Trị Đông, TPHCM",
          AccountID: "691ff06e7845656d154f3cfc",
          __v: 0,
          createdAt: "2025-11-21T04:54:06.280Z",
          updatedAt: "2025-11-21T04:54:06.280Z",
        },
        BusID: {
          _id: "691ff06e7845656d154f3d0d",
          BusLicense: "1234-ABCD",
          Capacity: 40,
          Status: true,
          __v: 0,
          createdAt: "2025-11-21T04:54:06.591Z",
          updatedAt: "2025-11-21T04:54:06.591Z",
        },
        RouteID: {
          _id: "691ff06e7845656d154f3d14",
          RouteName: "test",
          Status: true,
          __v: 0,
          createdAt: "2025-11-21T04:54:06.716Z",
          updatedAt: "2025-11-21T04:54:06.716Z",
        },
        Duration: 30,
        startTime: "12:00",
        startDate: "2025-01-01",
        endDate: "2025-05-30",
        Status: true,
        __v: 0,
        createdAt: "2025-11-21T04:54:06.843Z",
        updatedAt: "2025-11-21T04:54:06.843Z",
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockSchedules));

    render(<ShedulePage />);

    expect(
      screen.getByText("Đồng hành an toàn – Vững bước tương lai")
    ).toBeInTheDocument();
    expect(screen.getByText("Quản lý lịch trình")).toBeInTheDocument();
    expect(screen.getByText("Thêm lịch trình")).toBeInTheDocument();
    expect(screen.getByText("Quay lại")).toBeInTheDocument();
    expect(screen.getByTestId("Shedule-searchbar")).toBeInTheDocument();
    expect(screen.getByTestId("Schedule-time")).toBeInTheDocument();
    expect(screen.getByTestId("Shedule-list")).toBeInTheDocument();

    const scheduleCards = await screen.findAllByTestId("Schedule-card");
    expect(scheduleCards.length).toBe(2);
  });

  it("Test render schedule", async () => {
    render(<ShedulePage />);

    await waitFor(() => {
      expect(screen.getByText("4F3D1A")).toBeInTheDocument();
      expect(screen.getByText("Nguyễn Đức Thắng")).toBeInTheDocument();
      expect(screen.getByText("1234-ABCD")).toBeInTheDocument();
      expect(screen.getByTestId("Schedule-status-ico")).toBeInTheDocument();
      expect(screen.getByTestId("modify-button")).toBeInTheDocument();
      expect(screen.getByTestId("Schedule-menu-ico")).toBeInTheDocument();
      expect(screen.getByTestId("Schedule-delete-ico")).toBeInTheDocument();
    });
  });

  it("Test nut them lich trinh", async () => {
    render(<ShedulePage />);
    const user = userEvent.setup();

    const addButton = screen.getByText("Thêm lịch trình");
    await user.click(addButton);

    expect(screen.getByTestId("Create")).toBeInTheDocument();
  });

  it("Test nut quay lai", async () => {
    render(<ShedulePage />);
    const user = userEvent.setup();

    const backButton = screen.getByText("Quay lại");
    await user.click(backButton);

    expect(mockPush).toHaveBeenCalledWith(`/admin/main`);
  });

  it("Test nut sua lich trinh", async () => {
    render(<ShedulePage />);

    await waitFor(() => {
      const user = userEvent.setup();
      const modifyButton = screen.getByTestId("modify-button");
      user.click(modifyButton);

      expect(screen.getByTestId("Modify")).toBeInTheDocument();
    });
  });

  it("Test nut menu lich trinh", async () => {
    render(<ShedulePage />);

    await waitFor(() => {
      const user = userEvent.setup();
      const menuButton = screen.getByTestId("Schedule-menu-ico");
      user.click(menuButton);

      expect(mockPush).toHaveBeenCalledWith(
        `/admin/schedule/691ff06e7845656d154f3d1a`
      );
    });
  });

  it("Test nut xoa lich trinh", async () => {
    const user = userEvent.setup();
    render(<ShedulePage />);

    const confirmSpy = jest
      .spyOn(window, "confirm")
      .mockImplementation(() => true);

    const deleteButton = await screen.findByTestId("Schedule-delete-ico");
    await user.click(deleteButton);
    expect(confirmSpy).toHaveBeenCalled();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/schedules/691ff06e7845656d154f3d1a`,
        expect.objectContaining({
          method: "PATCH",
          body: JSON.stringify({ Status: false }),
        })
      );
    });

    confirmSpy.mockRestore();
  });
});

describe("Test schedule detail page", () => {
  beforeEach(() => {
    fetchMock.resetMocks();

    fetchMock.mockResponse((req) => {
      const url = req.url;

      if (
        url.includes(`/schedules/691ff06e7845656d154f3d1a`) &&
        req.method === "GET"
      ) {
        return Promise.resolve(JSON.stringify(mockSchedules[0]));
      }

      if (
        url.includes("/schedule-details") &&
        url.includes("691ff06e7845656d154f3d1a") &&
        req.method === "GET"
      ) {
        return Promise.resolve(JSON.stringify(mockScheduleDetail));
      }

      return Promise.resolve(JSON.stringify(null));
    });
  });

  it("Test render full page", async () => {
    render(<ScheduleDetailPage />);

    await waitFor(async () => {
      expect(screen.getByText("Chi tiết lịch trình")).toBeInTheDocument();
      expect(screen.getByText("Quay lại")).toBeInTheDocument();
      expect(screen.getByText("Theo dõi")).toBeInTheDocument();
      expect(screen.getByText("Mã lịch trình: 4F3D1A")).toBeInTheDocument();
      expect(screen.getByText("Trạng thái:")).toBeInTheDocument();
      expect(screen.getByTestId("detail-status")).toBeInTheDocument();
      expect(
        screen.getByText("Tuyến đường: Đại học Sài Gòn - Bệnh viện Chợ Rẫy")
      ).toBeInTheDocument();
      expect(screen.getByText("Giờ bắt đầu: 12:20")).toBeInTheDocument();
      expect(screen.getByText("Ngày bắt đầu: 2025-01-01")).toBeInTheDocument();
      expect(screen.getByText("Ngày kết thúc: 2025-05-30")).toBeInTheDocument();
      expect(screen.getByText("Xe buýt: 1234-ABCD")).toBeInTheDocument();
      expect(
        screen.getByText("Tài xế: 4F3D01 - Nguyễn Đức Thắng")
      ).toBeInTheDocument();
      expect(screen.getByText("Danh sách học sinh:")).toBeInTheDocument();
      const scheduleCards = await screen.findAllByTestId("student");
      expect(scheduleCards.length).toBe(3);
    });
  });
});

describe("Test create schedule page", () => {
  beforeEach(() => {
    fetchMock.resetMocks();

    fetchMock.mockResponse((req) => {
      const url = req.url;
      if (url.includes("/drivers") && req.method === "GET") {
        return Promise.resolve(JSON.stringify(mockDrivers));
      }

      if (url.includes("/buses") && req.method === "GET") {
        return Promise.resolve(JSON.stringify(mockBuses));
      }

      if (url.includes("/routes") && req.method === "GET") {
        return Promise.resolve(JSON.stringify(mockRoutes));
      }

      if (url.includes("/students") && req.method === "GET") {
        return Promise.resolve(JSON.stringify(mockStudents));
      }

      if (url.includes("/managers") && req.method === "GET") {
        return Promise.resolve(JSON.stringify(mockManagers));
      }

      return Promise.resolve(JSON.stringify(null));
    });
  });

  it("Test render full page", async () => {
    const setCreateProp = jest.fn();
    const onScheduleCreated = jest.fn();

    render(
      <CreateSchedule
        createProp={true}
        setCreateProp={setCreateProp}
        onScheduleCreated={onScheduleCreated}
      />
    );

    expect(screen.getByText("Thêm lịch trình mới:")).toBeInTheDocument();
    expect(screen.getByText("Chọn tài xế:")).toBeInTheDocument();
    const driverOps = await screen.findAllByTestId("driver");
    expect(driverOps.length).toBe(1);
    expect(screen.getByText("Chọn xe buýt:")).toBeInTheDocument();
    const busOps = await screen.findAllByTestId("bus");
    expect(busOps.length).toBe(1);
    expect(screen.getByText("Chọn tuyến đường:")).toBeInTheDocument();
    const routeOps = await screen.findAllByTestId("route");
    expect(routeOps.length).toBe(2);
    expect(screen.getByText("Chọn giờ chạy:")).toBeInTheDocument();
    expect(screen.getByTestId("startTime")).toBeInTheDocument();
    expect(screen.getByText("Ngày bắt đầu:")).toBeInTheDocument();
    expect(screen.getByTestId("startDate")).toBeInTheDocument();
    expect(screen.getByText("Ngày kết thúc:")).toBeInTheDocument();
    expect(screen.getByTestId("endDate")).toBeInTheDocument();
    expect(screen.getByText("Danh sách học sinh:")).toBeInTheDocument();
    const studentOps = await screen.findAllByTestId("student");
    expect(studentOps.length).toBe(3);
    expect(screen.getByText("Hủy")).toBeInTheDocument();
    expect(screen.getByText("Hoàn thành")).toBeInTheDocument();
  });

  it("Test nut huy them", async () => {
    const setCreateProp = jest.fn();
    const onScheduleCreated = jest.fn();

    render(
      <CreateSchedule
        createProp={true}
        setCreateProp={setCreateProp}
        onScheduleCreated={onScheduleCreated}
      />
    );
    const user = userEvent.setup();
    const cancelButton = screen.getByText("Hủy");
    await user.click(cancelButton);
    expect(setCreateProp).toHaveBeenCalled();
  });

  it("Test nut xac nhan them", async () => {
    const setCreateProp = jest.fn();
    const onScheduleCreated = jest.fn();

    render(
      <CreateSchedule
        createProp={true}
        setCreateProp={setCreateProp}
        onScheduleCreated={onScheduleCreated}
      />
    );
    const user = userEvent.setup();
    const acceptButton = await screen.getByTestId("btnaccept");
    await user.click(acceptButton);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/schedules`,
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
    });
  });
});

describe("Test modify schedule page", () => {
  beforeEach(() => {
    fetchMock.resetMocks();

    fetchMock.mockResponse((req) => {
      const url = req.url;

      if (url.includes("/drivers") && req.method === "GET") {
        return Promise.resolve(JSON.stringify(mockDrivers));
      }

      if (url.includes("/buses") && req.method === "GET") {
        return Promise.resolve(JSON.stringify(mockBuses));
      }

      if (url.includes("/routes") && req.method === "GET") {
        return Promise.resolve(JSON.stringify(mockRoutes));
      }

      if (url.includes("/students") && req.method === "GET") {
        return Promise.resolve(JSON.stringify(mockStudents));
      }

      if (
        url.includes(`/schedules/691ff06e7845656d154f3d1a`) &&
        req.method === "GET"
      ) {
        return Promise.resolve(JSON.stringify(mockSchedules));
      }

      if (
        url.includes("/schedule-details") &&
        url.includes("691ff06e7845656d154f3d1a") &&
        req.method === "GET"
      ) {
        return Promise.resolve(JSON.stringify(mockScheduleDetail));
      }

      return Promise.resolve(JSON.stringify(null));
    });
  });

  it("Test render full page", async () => {
    const setModifyProp = jest.fn();
    const onScheduleModified = jest.fn();

    render(
      <ModifySchedule
        modifyProp={true}
        setModifyProp={setModifyProp}
        scheduleId={"691ff06e7845656d154f3d1a"}
        onScheduleModified={onScheduleModified}
      />
    );

    expect(screen.getByText("Cập nhật lịch trình:")).toBeInTheDocument();
    expect(screen.getByText("Chọn tài xế:")).toBeInTheDocument();
    const driverOps = await screen.findAllByTestId("driver");
    expect(driverOps.length).toBe(1);
    expect(screen.getByText("Chọn xe buýt:")).toBeInTheDocument();
    const busOps = await screen.findAllByTestId("bus");
    expect(busOps.length).toBe(1);
    expect(screen.getByText("Chọn tuyến đường:")).toBeInTheDocument();
    const routeOps = await screen.findAllByTestId("route");
    expect(routeOps.length).toBe(2);
    expect(screen.getByText("Chọn giờ chạy:")).toBeInTheDocument();
    expect(screen.getByTestId("startTime")).toBeInTheDocument();
    expect(screen.getByText("Ngày bắt đầu:")).toBeInTheDocument();
    expect(screen.getByTestId("startDate")).toBeInTheDocument();
    expect(screen.getByText("Ngày kết thúc:")).toBeInTheDocument();
    expect(screen.getByTestId("endDate")).toBeInTheDocument();
    expect(screen.getByText("Danh sách học sinh:")).toBeInTheDocument();
    const studentOps = await screen.findAllByTestId("student");
    expect(studentOps.length).toBe(3);
    expect(screen.getByText("Hủy")).toBeInTheDocument();
    expect(screen.getByText("Hoàn thành")).toBeInTheDocument();
  });

  it("Test nut huy chinh sua", async () => {
    const setModifyProp = jest.fn();
    const onScheduleModified = jest.fn();

    render(
      <ModifySchedule
        modifyProp={true}
        setModifyProp={setModifyProp}
        scheduleId={"691ff06e7845656d154f3d1a"}
        onScheduleModified={onScheduleModified}
      />
    );
    const user = userEvent.setup();
    const cancelButton = screen.getByText("Hủy");
    await user.click(cancelButton);
    expect(setModifyProp).toHaveBeenCalled();
  });

  it("Test nut xac nhan them", async () => {
    const setModifyProp = jest.fn();
    const onScheduleModified = jest.fn();

    render(
      <ModifySchedule
        modifyProp={true}
        setModifyProp={setModifyProp}
        scheduleId={"691ff06e7845656d154f3d1a"}
        onScheduleModified={onScheduleModified}
      />
    );
    const user = userEvent.setup();
    const acceptButton = await screen.getByTestId("btnaccept");
    await user.click(acceptButton);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/schedules/691ff06e7845656d154f3d1a`,
        expect.objectContaining({
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        })
      );
    });
  });
});
