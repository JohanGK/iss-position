import React from "react";
import logo from "./logo.svg";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./App.css";

const satelliteIcon = new L.Icon({
  iconUrl:
    "https://img.icons8.com/material/16/000000/satellite-sending-signal.png",
  iconAnchor: [25, 25],
  popupAnchor: [10, -44],
  iconSize: [50, 50]
});

const historyIcon = new L.Icon({
  iconUrl:
    "https://img.icons8.com/android/24/000000/new-moon.png",
  iconAnchor: [5, 5],
  popupAnchor: [10, -44],
  iconSize: [10, 10]
});

class App extends React.Component {
  state = {
    history: [{"lat": 0, "lng":0}],
    lat: 51.505,
    lng: -0.09,
    velocity: 0,
    altitude: 0
  };

  componentDidMount() {
    setInterval(async () => {
      fetch("https://api.wheretheiss.at/v1/satellites/25544")
        .then(res => res.json())
        .then(data => {
          this.setState(prevState => ({
            history: [...prevState.history, {"lat": data.latitude, "lng": data.longitude}],
            lat: data.latitude,
            lng: data.longitude,
            velocity: data.velocity,
            altitude: data.altitude            
          }));
        });
    }, 3000); 
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const historyMarkers = this.state.history.map((position,i)=><Marker key={i} position = {position} icon={historyIcon} />)

    return (
      <Map center={position} zoom="4">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {historyMarkers}
        <Marker position={position} icon={satelliteIcon}>
          <Popup>
            <h2>Info</h2>
            <p>Altitude: {this.state.altitude}</p>
            <p>Velocity: {this.state.velocity}</p>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default App;
