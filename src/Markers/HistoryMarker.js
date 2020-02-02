import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import MarkerPopup from "./MarkerPopup";

const historyIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/android/24/000000/new-moon.png",
  iconAnchor: [1, 1],
  popupAnchor: [10, -44],
  iconSize: [5, 5]
});

class HistoryMarker extends React.Component {
  render() {
    const position = [this.props.data.lat, this.props.data.lng];
    return (
      <Marker position={position} icon={historyIcon}>
        <MarkerPopup info={this.props.data} />
      </Marker>
    );
  }
}

export default HistoryMarker;
