import React from "react";
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
  iconUrl: "https://img.icons8.com/android/24/000000/new-moon.png",
  iconAnchor: [1, 1],
  popupAnchor: [10, -44],
  iconSize: [5, 5]
});

class App extends React.Component {
  state = {
    history: [{ lat: 0, lng: 0 }],
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
            history: [
              ...prevState.history,
              { lat: data.latitude, lng: data.longitude }
            ],
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
    const historyMarkers = this.state.history.map((position, i) => (
      <Marker key={i} position={position} icon={historyIcon} />
    ));

    return (
      <Map center={[0,0]} zoom="4">
        <TileLayer
          attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9oYW5rcm8iLCJhIjoiY2s2MjFjb3c0MDV1eTNlbzQzdWltMGJoMiJ9.rfynyBy_0cmX7D2ONmK_Tw"
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
