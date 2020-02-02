import React from "react";
import { Map, TileLayer } from "react-leaflet";
import SatelliteMarker from "./Markers/SatelliteMarker.js";
import HistoryMarker from "./Markers/HistoryMarker";

export default class MapComponent extends React.Component {
  render() {
    const currentData = this.props.history[this.props.history.length - 1];
    const historyMarkers = this.props.history.map((currentData, i) => (
      <HistoryMarker data={currentData} key={i} />
    ));

    return (
      <Map center={[0, 0]} zoom="4">
        <TileLayer
          attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9oYW5rcm8iLCJhIjoiY2s2MjFjb3c0MDV1eTNlbzQzdWltMGJoMiJ9.rfynyBy_0cmX7D2ONmK_Tw"
        />
        {historyMarkers}
        <SatelliteMarker data={currentData}
        />
      </Map>
    );
  }
}
