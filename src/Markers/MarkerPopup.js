import React from "react";
import { Popup } from "react-leaflet";

export default class MarkerPopup extends React.Component {
  render() {
    const info = this.props.info;
    return (
      <Popup>
        <h2>Info</h2>
        <p>Altitude: {info.altitude}</p>
        <p>Velocity: {info.velocity}</p>
        <p>Latitude: {info.lat}</p>
        <p>Longitude: {info.lng}</p>
        <p>Velocity: {info.velocity}</p>
        <p>Time: {Date(info.timestamp)}</p>
      </Popup>
    );
  }
}
