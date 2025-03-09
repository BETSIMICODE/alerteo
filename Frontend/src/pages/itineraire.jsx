import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const DangerMap = () => {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_EXPRESS_URL + '/api/zonelevel');
        setZones(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des zones :', error);
      }
    };
    fetchZones();
  }, []);
  
  const defaultCenter = [-21.4550, 47.0855]; // Coordonnées de Fianarantsoa

  return (
    <MapContainer center={defaultCenter} zoom={40} style={{ height: '500px', width: '100%',opacity:6,}}
    className="z-10">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {zones.map((zone, index) => (
        <Circle
          key={index}
          center={[zone.latitude, zone.longitude]}
          radius={zone.radius}
          pathOptions={{
            fillColor:
              zone.dangerLevel === 'high' ? 'red' :
              zone.dangerLevel === 'medium' ? 'orange' :
              'green', // couleur verte pour low
            color: 'none',
          }}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            <span>{`Zone ${zone.dangerLevel} danger`}</span>
            <p>{`Rayon : ${zone.radius} km`}</p>
          </Tooltip>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default DangerMap;
