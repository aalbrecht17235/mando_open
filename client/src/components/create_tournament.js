import React, { Component } from "react";
import axios from "axios";

export class CreateTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      error: null
    };
    this.createNewTournament = this.createNewTournament.bind(this);
  }
  createNewTournament() {
    const date = this.state.date;
    const name = this.state.name;
    axios
      .post("/tournament/create", { name, date })
      .then(res => {
        console.log("Response from create tournament", res);
        const { name } = res.data.tournament;
        this.props.history.push(`/tournament/${name}`);
      })
      .catch(err =>
        console.log("Error occured while attempting to create Tournament", err)
      );
  }

  render() {
    return (
      <form>
        <div>
          Tournament name:
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Tournament name"
            style={{ margin: "10px" }}
          />
        </div>
        <div>
          Start Date:
          <input
            type="date"
            value={this.state.date}
            onChange={e => this.setState({ date: e.target.value })}
            style={{ margin: "10px" }}
          />
        </div>
        <div>
          <button onClick={this.createNewTournament}>Submit</button>
        </div>
      </form>
    );
  }
}

export default CreateTournament;
