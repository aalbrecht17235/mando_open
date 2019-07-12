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
    const number = this.state.number;
    const tournamentId = this.props.tournamentId;
    console.log(
      "attempt to create entity, nunmber: ",
      number,
      " TournyId: ",
      tournamentId
    );
    axios
      .post("/round/create", { number, tournamentId })
      .then(res => window.location.reload())
      .catch(err =>
        console.log("Error occured while attempting to create Round", err)
      );
  }

  render() {
    return (
      <form style={{ border: "2px solid pink", margin: "5px" }}>
        Create a new round!
        <div>
          Round number:
          <input
            type="number"
            value={this.state.number}
            onChange={e => this.setState({ number: e.target.value })}
            placeholder="Round number"
            style={{ margin: "10px" }}
          />
        </div>
        <div>
          <button onClick={this.createNewRound}>Submit</button>
        </div>
      </form>
    );
  }
}

export default CreateRound;
