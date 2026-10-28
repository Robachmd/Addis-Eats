'use client'
import React from 'react';
import { MapContainer, TileLayer,Marker,Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const CENTER= [9.01424800026053, 38.8011153579882];
const Map=()=>{
    return(
        <div>
            <MapContainer zoom={12} center={CENTER} scrollWheelZoom={false} style={{ width: '100%', height: '350px' }}>
                <Marker position={CENTER}/>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap contributors" />
                <Tooltip>Your order location</Tooltip>
            </MapContainer>
        </div>
    )

}
export default Map;