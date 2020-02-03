import React from "react";
import "./App.css";
import MapComponent from "./MapComponent.js";
import HistoryList from "./HistoryList.js";

class App extends React.Component {
  state = {
    history: []
  };

  constructor(props) {
    super(props);
    setInterval(async () => {
      this.fetchSatelliteData();
    }, 3000);
  }

  fetchSatelliteData() {
    fetch("https://api.wheretheiss.at/v1/satellites/25544")
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => ({
          history: [
            ...prevState.history,
            {
              lat: data.latitude,
              lng: data.longitude,
              velocity: data.velocity,
              altitude: data.altitude,
              timestamp: data.timestamp,
              visibility: data.visibility
            }
          ]
        }));
      });
  }

  render() {
    return (
      <div>
        <MapComponent history={this.state.history} />
        <HistoryList history={this.state.history} />
      </div>
    );
  }
}

export default App;
