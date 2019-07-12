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
    const roundCount = this.state.rounds.length;
    return (
      <div>
        {roundCount > 0 ? (
          rounds.map(round => (
            <Round
              key={`round${round.number}+${tournamentId}`}
              round={round}
              tournamentId={tournamentId}
            />
          ))
        ) : (
          <div>There are no rounds</div>
        )}
        <CreateRound number={roundCount + 1} tournamentId={tournamentId} />
      </div>
    );
  }
}

export default RoundList;
