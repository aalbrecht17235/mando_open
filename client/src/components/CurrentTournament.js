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
        this.setState({ tournament: res.data.tournament });
      })
      .catch(err => {
        console.error("An error occured while getting tournament", err);
      });
  }
  render() {
    return (
      <div style={{ border: "2px solid cyan", margin: "5px" }}>
        {this.state.tournament.name === undefined ? (
          <div>Current Tournament name not loaded</div>
        ) : (
          <div>
            Current Tournament name: {this.state.tournament.name}
            <RoundList tournamentId={this.state.tournament._id} />
          </div>
        )}
      </div>
    );
  }
}

export default CurrentTournament;
