import React, { Component } from "react";
import axios from "axios";
import RoundList from "../RoundList";

class CurrentTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournament: {},
      error: null
    };
  }
  componentDidMount() {
    const tournamentName = this.props.match.params.id;
    axios
      .get("/tournament/find", { params: { tournamentName } })
      .then(res => {
        console.log("CURRETN TOURNAMENT DATA: ", res.data.tournament);
        this.setState({ tournament: res.data.tournament });
      })
      .catch(err => {
        console.log("An error occured while getting tournament", err);
      });
  }
  render() {
    return (
      <div>
        {this.state.tournament.name === undefined ? (
          <div>Current Tournament name not loaded</div>
        ) : (
          <div>
            Current Tournament name: {this.state.tournament.name}
            <RoundList />
          </div>
        )}
      </div>
    );
  }
}

export default CurrentTournament;
