import React, { Component } from "react";
import MatchList from "../MatchList";
import axios from "axios";

export class Round extends Component {
  constructor(props) {
    super();
    this.state = {
      error: null
    };
    this.deleteRound = this.deleteRound.bind(this);
  }
  deleteRound() {
    axios.delete("/round/number", { params: { number: this.props.round.number } })
      .then(res => {
        this.setState({ error: null });
        window.location.reload();
      })
      .catch(err => this.setState({ error: "An error occured" }));
  }

  render() {
    const roundNumber = this.props.round.number;
    return (
      <div style={{ border: "2px solid", margin: "5px" }}>
        <div>Round number: test {roundNumber}</div>
        <div>
          <MatchList roundId={this.props.round._id} />
        </div>
        <button onClick={this.deleteRound}>Delete Round {roundNumber}</button>
        <div style={{ color: "red" }}>
          {this.state.error ? this.state.error : ""}
        </div>
      </div>
    );
  }
}

export default Round;
