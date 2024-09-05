import { Box, Typography, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid2';
import React, { useState, useEffect } from 'react';
import { auth } from '../../../firebaseconfig'; // Asegúrate de que la ruta es correcta
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './map.css'

export default function login(){
    
    document.title = 'Horizon360 - Map';

    const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);

  useEffect(() => {
    // Inicializa el mapa con Leaflet
    const mapInstance = L.map('map', {
      zoomControl: false // Desactiva el control de zoom predeterminado
    }).setView([51.505, -0.09], 13);

    // Capa de azulejos de OpenStreetMap (vista normal)
    const openStreetMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance); // Se añade la capa por defecto

    // Capa satelital de Esri
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // Control de capas para alternar entre OSM y Satélite
    const baseLayers = {
      "OpenStreetMap": openStreetMapLayer,
      "Satélite": satelliteLayer
    };

    L.control.layers(baseLayers).addTo(mapInstance);

    // Obtén la ubicación actual del usuario
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      // Agrega un marcador con popup en la ubicación actual
      L.marker([latitude, longitude])
        .addTo(mapInstance)
        .bindPopup('<b>Ubicación actual</b>')
        .openPopup();

      // Centra el mapa en la ubicación actual
      mapInstance.setView([latitude, longitude], 13);

      // Configura el mapa y el estado
      setMap(mapInstance);
    });

    // Configura el control de búsqueda
    const geocoderInstance = L.Control.geocoder({
      defaultMarkGeocode: true
    }).addTo(mapInstance);

    // Agrega controles de zoom personalizados
    L.control.zoom({
      position: 'bottomright' // Posición de los botones de zoom
    }).addTo(mapInstance);

    return () => {
      mapInstance.remove(); // Elimina el mapa al desmontar el componente para evitar fugas de memoria
    };
  }, []);

  const handleSearch = (query) => {
    if (map && query) {
      const geocoder = L.Control.Geocoder.nominatim(); // Usa el geocoder Nominatim

      geocoder.geocode(query, (results) => {
        if (results && results.length > 0) {
          const coords = results[0].center;
          const name = results[0].name;

          // Agrega un marcador con popup en la ubicación buscada
          const destinationMarker = L.marker([coords.lat, coords.lng])
            .addTo(map)
            .bindPopup(`<b>${name}</b>`)
            .openPopup();

          // Crea o actualiza la ruta
          if (routingControl) {
            map.removeControl(routingControl);
          }

          const newRoutingControl = L.Routing.control({
            waypoints: [
              L.latLng(map.getCenter().lat, map.getCenter().lng), // Punto de partida: ubicación actual
              L.latLng(coords.lat, coords.lng) // Punto de destino: ubicación buscada
            ],
            routeWhileDragging: true,
            router: L.Routing.osrmv1({
              serviceUrl: 'http://router.project-osrm.org/route/v1'
            })
          }).addTo(map);

          setRoutingControl(newRoutingControl);
        } else {
          alert('No se encontraron resultados.');
        }
      });
    } else {
      alert('Por favor, ingrese un término de búsqueda válido.');
    }
  };

    return (
        <Box class='frosted box' >
            <Grid container spacing={2} columns={1}>
                <Grid size={2}/>
                <Grid size={1}>
                    <Typography
                    variant="h4"
                    textAlign={"center"}
                    >
                    Map</Typography>
                </Grid>
                <Grid size={1}>
                    <div className="App">
                    <div id="map" style={{ height: '500px', position: 'relative' }}>
                        <div
                        className="search-container"
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            zIndex: 1000,
                            backgroundColor: 'white',
                            padding: '5px',
                            borderRadius: '5px',
                            boxShadow: '0px 0px 5px rgba(0,0,0,0.5)'
                        }}
                        >
                        <input
                            type="text"
                            id="search"
                            placeholder="Buscar destino..."
                            onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(e.target.value);
                                e.target.value = ''; // Limpia el campo de búsqueda después de la búsqueda
                            }
                            }}
                            style={{
                            width: '200px',
                            padding: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                            }}
                        />
                        </div>
                    </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}