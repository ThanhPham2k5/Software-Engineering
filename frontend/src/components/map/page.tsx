"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useEffect, useRef } from "react";
import "leaflet.marker-motion";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface RoutingProps {
  points: number[][];
  startTime: string;
  duration: number;
}

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const carIcon = L.icon({
  iconUrl: "/bus.png",
  iconSize: [32, 32],
});

function cleanCoordinates(coords: L.LatLng[]) {
  const cleaned: L.LatLng[] = [];
  if (!coords || coords.length === 0) return [];
  cleaned.push(coords[0]);
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    if (prev.lat !== curr.lat || prev.lng !== curr.lng) {
      cleaned.push(curr);
    }
  }
  return cleaned;
}

function calculateRouteProgress(
  startTime: string,
  duration: number,
  nowTime: string
) {
  // Hàm phụ: Chuyển đổi chuỗi "HH:mm" thành tổng số phút tính từ 00:00
  const toMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const startTotalMinutes = toMinutes(startTime);
  const nowTotalMinutes = toMinutes(nowTime);

  // 1. Tính thời gian đã trôi qua (phút)
  const elapsedMinutes = nowTotalMinutes - startTotalMinutes;

  // 2. Các trường hợp đặc biệt
  if (duration === 0) return 1; // Nếu lộ trình 0 phút thì coi như xong luôn
  if (elapsedMinutes <= 0) return 0; // Nếu chưa đến giờ chạy

  // 3. Tính tỷ lệ
  const progress = elapsedMinutes / duration;

  // 4. Giới hạn kết quả: không được vượt quá 1 (100%)
  return Math.min(progress, 1);
}

function Routing({ points, startTime, duration }: RoutingProps) {
  const map = useMap();
  const routeLayersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!map || !points || points.length === 0) return;

    const routingControl = L.Routing.control({
      waypoints: points.map((coord) => L.latLng(coord[0], coord[1])),
      show: true,
      addWaypoints: true,
    }).addTo(map);

    routingControl.on("routesfound", function (e: any) {
      console.log("RouteFound: ", e);
      if (routeLayersRef.current) {
        map.removeLayer(routeLayersRef.current);
      }

      const coordinates = e.routes[0].coordinates;
      const cleanedPath = cleanCoordinates(coordinates);

      const routeLine = L.polyline(coordinates, { color: "blue" });

      const progress = calculateRouteProgress("07:00", 30, "06:30");
      console.log("Progress:", progress);

      if (progress >= 1.0) {
        const lastPoint = coordinates[coordinates.length - 1];

        const staticMarker = L.marker(lastPoint, { icon: carIcon });

        routeLayersRef.current = L.layerGroup([routeLine, staticMarker]).addTo(
          map
        );
      } else {
        const startIndex = Math.floor(cleanedPath.length * progress);
        const truePath = cleanedPath.slice(startIndex);
        console.log("TruePath la: ", truePath);

        const summary = e.routes[0].summary;
        const totalDistanceMeters = summary.totalDistance;
        const totalDistanceKm = totalDistanceMeters / 1000;
        const durationHours = duration / 60;
        const speed = totalDistanceKm / durationHours;

        const markerMotion = (L as any).markerMotion(truePath, speed, {
          icon: carIcon,
          rotation: true,
          autoplay: true,
          loop: false,
        });

        routeLayersRef.current = L.layerGroup([routeLine, markerMotion]).addTo(
          map
        );
      }
    });

    return () => {
      map.removeControl(routingControl);
      if (routeLayersRef.current) {
        map.removeLayer(routeLayersRef.current);
      }
    };
  }, [map, points, duration]);

  return null;
}

export default function Map({ points, startTime, duration }: RoutingProps) {
  return (
    <MapContainer
      center={[21.028667, 105.848843]}
      zoom={14}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        attribution="© Google Maps"
      />
      <Routing points={points} startTime={startTime} duration={duration} />
    </MapContainer>
  );
}
