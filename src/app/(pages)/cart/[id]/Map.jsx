"use client";

import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const CENTER = [9.01424800026053, 38.8011153579882];

export default function Map() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
        <MapContainer center={CENTER} zoom={13} scrollWheelZoom={false} style={{ width: "100%", height: "100%" }}>
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
        />

        <Marker position={CENTER}>
            <Tooltip permanent direction="top">
            Your order location
            </Tooltip>
        </Marker>
        </MapContainer>
    </div>
  );
}
