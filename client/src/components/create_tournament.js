import React, { Component } from "react";
import axios from "axios";

export class CreateTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      error: null
    };
    this.submitNewTournament = this.submitNewTournament.bind(this);
  }
  submitNewTournament() {
    console.log("Submitting new Tournament.");
    const date = new Date();
    const name = this.state.name;
    axios
      .post("/tournament/create", {
        name,
        date
      })
      .then(res => console.log("Response from create tournament", res))
      .catch(err =>
        console.log("Error occured while attempting to create Tournament", err)
      );
  }
  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
          placeholder="Tournament name"
        />
        <button onClick={this.submitNewTournament}>Submit</button>
      </form>
    );
  }
}

export default CreateTournament;
