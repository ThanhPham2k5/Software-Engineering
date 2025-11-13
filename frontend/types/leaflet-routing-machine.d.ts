/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "leaflet" {
  // ==========================================================
  // 1. LEAFLET ROUTING MACHINE (L.Routing)
  // ==========================================================

  // Định nghĩa Interface cho các tham số đầu vào của Routing Control
  interface RoutingControlOptions {
    waypoints: LatLng[];
    show: boolean;
    addWaypoints: boolean;
    routeWhileDragging?: boolean;
    router?: any; // Có thể phức tạp, dùng any tạm thời nếu không rõ kiểu
    // ... thêm các tùy chọn khác nếu cần
  }

  // Định nghĩa lớp Routing.Control
  namespace Routing {
    class Control extends Control_ {
      // Giả định nó mở rộng L.Control (Control_)
      constructor(options: RoutingControlOptions);
      // Định nghĩa lại hàm control để trả về lớp Control đã định nghĩa
      getPlan(): any;
      on(
        type: "routesfound",
        fn: (e: RoutesFoundEvent) => void,
        context?: any
      ): this;
      // ... thêm các phương thức khác nếu bạn gọi chúng
    }
    // Định nghĩa lại hàm factory control (hàm chính)
    function control(options: RoutingControlOptions): Control;
  }

  // Định nghĩa kiểu dữ liệu chi tiết cho sự kiện routesfound
  interface RoutesFoundEvent extends LeafletEvent {
    routes: { coordinates: LatLng[] }[]; // Quan trọng: có trường coordinates
    // ... thêm các trường khác nếu bạn cần (ví dụ: summary)
  }

  // ==========================================================
  // 2. LEAFLET MARKER MOTION (L.markerMotion)
  // ==========================================================

  // Định nghĩa Interface cho các tùy chọn của Marker Motion
  interface MarkerMotionOptions {
    icon: Icon;
    rotation: boolean;
    autoplay: boolean;
    loop: boolean;
    // ... thêm các tùy chọn khác nếu cần
  }

  // Định nghĩa lớp MarkerMotion (Nếu bạn cần gọi start()/stop() trên đối tượng)
  interface MarkerMotion extends Layer {
    start: () => void;
    stop: () => void;
    // ...
  }

  // Khai báo hàm markerMotion mới trên đối tượng L
  function markerMotion(
    path: LatLng[],
    duration: number,
    options: MarkerMotionOptions
  ): MarkerMotion;
}
