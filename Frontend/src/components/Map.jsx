import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';

const MapingG = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialisation de la carte
    const map = L.map(mapRef.current).setView([48.8566, 2.3522], 13); // Position par défaut (Paris ici)

    // Ajouter une couche de tuiles (par exemple OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Obtenir la position actuelle de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // Position de l'hôpital (exemple : Paris)
        const hospitalLat = 48.8566;
        const hospitalLon = 2.3522;

        // Créer un itinéraire entre la position de l'utilisateur et l'hôpital
        const userLocation = L.latLng(userLat, userLon);
        const hospitalLocation = L.latLng(hospitalLat, hospitalLon);

        // Affichage de l'itinéraire
        L.Routing.control({
          waypoints: [userLocation, hospitalLocation],
          routeWhileDragging: true,
        }).addTo(map);
      });
    } else {
      alert('Géolocalisation non supportée par ce navigateur.');
    }
  }, []);

  return <div id="map" ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default MapingG;
