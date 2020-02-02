import React from "react";
import "./App.css";
import MapComponent from "./MapComponent.js";
import HistoryList from "./HistoryList.js";

class App extends React.Component {
  state = {
    history: [{ lat: 0, lng: 0, velocity: 0, altitude: 0, timestamp: 0, visibility: "?" }]
  };

  constructor(props) {
    super(props);
    setInterval(async () => {
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
    }, 3000);
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
