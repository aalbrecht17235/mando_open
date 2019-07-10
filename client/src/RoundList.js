import React, { Component } from "react";
import axios from "axios";
import CreateRound from "./components/CreateRound";
import Round from "./components/Round";

class RoundList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: [],
      error: null
    };
  }

  componentDidMount() {
    axios
      .get("/round")
      .then(res => this.setState({ rounds: res.data.rounds }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const rounds = this.state.rounds;
    const tournamentId = this.props.tournamentId;
    return (
      <div>
        {this.state.rounds.length > 0 ? (
          rounds.map(round => (
            <Round key={`round${round.number}+${tournamentId}`} round={round} />
          ))
        ) : (
          <div>There are no rounds</div>
        )}
        <CreateRound tournamentId={tournamentId} />
      </div>
    );
  }
}

export default RoundList;
