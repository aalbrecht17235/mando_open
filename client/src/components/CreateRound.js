import React, { Component } from "react";
import axios from "axios";

export class CreateRound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      error: null
    };
    this.createNewRound = this.createNewRound.bind(this);
  }
  createNewRound() {
    const { number, tournamentId } = this.props;
    console.log("number: ", number, "tournamentId: ", tournamentId);
    axios
      .post("/round/create", { number, tournamentId })
      .then(res => window.location.reload())
      .catch(err =>
        console.log("Error occured while attempting to create Round", err)
      );
  }

  render() {
    return (
      <div style={{ border: "2px solid pink", margin: "5px" }}>
        <button onClick={this.createNewRound}>Add Round</button>
      </div>
    );
  }
}

export default CreateRound;
