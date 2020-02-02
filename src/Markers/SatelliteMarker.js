import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import MarkerPopup from "./MarkerPopup.js";

const satelliteIcon = new L.Icon({
  iconUrl:
    "https://img.icons8.com/material/16/000000/satellite-sending-signal.png",
  iconAnchor: [25, 25],
  popupAnchor: [10, -44],
  iconSize: [50, 50]
});

class SatelliteMarker extends React.Component {
  render() {
    const currentPosition = [this.props.data.lat, this.props.data.lng];

    return (
      <Marker position={currentPosition} icon={satelliteIcon}>
        <MarkerPopup info={this.props.data} />
      </Marker>
    );
  }
}

export default SatelliteMarker;
