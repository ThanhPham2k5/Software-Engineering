"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useEffect, useRef } from "react";
import "leaflet.marker-motion";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const carIcon = L.icon({
  iconUrl: markerIcon2x.src,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
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

function Routing({ points, startTime }) {
  console.log("startTime la: " + startTime);
  console.log("Time hien tai la: " + Date.now());
  const map = useMap();
  const routeLayersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!map || !points || points.length === 0) return;

    const routingControl = L.Routing.control({
      waypoints: points.map((coord) => L.latLng(coord[0], coord[1])),
      show: true,
      addWaypoints: true,
    }).addTo(map);

    routingControl.on("routesfound", function (e) {
      console.log(e);
      if (routeLayersRef.current) {
        map.removeLayer(routeLayersRef.current);
      }

      const coordinates = e.routes[0].coordinates;

      const cleanedPath = cleanCoordinates(coordinates);

      const routeLine = L.polyline(coordinates, { color: "blue" });

      const speed = 30;

      const markerMotion = (L as any).markerMotion(cleanedPath, speed, {
        icon: carIcon,
        rotation: true,
        autoplay: true,
        loop: true,
      });

      routeLayersRef.current = L.layerGroup([routeLine, markerMotion]).addTo(
        map
      );
    });

    return () => {
      map.removeControl(routingControl);
      if (routeLayersRef.current) {
        map.removeLayer(routeLayersRef.current);
      }
    };
  }, [map, points]);

  return null;
}

export default function Map({ points, startTime }) {
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

      <Routing points={points} startTime={startTime} />
    </MapContainer>
  );
}
