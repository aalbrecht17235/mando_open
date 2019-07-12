import React, { Component } from "react";
import axios from "axios";
import Team from "../entities/Team";

class CreateMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "08:00",
      players: [],
      selectTeam1: false,
      selectTeam2: false,
      teams: [new Team("Team 1"), new Team("Team 2")],
      error: null
    };
    this.createNewMatch = this.createNewMatch.bind(this);
  }

  componentDidMount() {
    axios.get("/player").then(res => {
      const { error, players } = res.data;
      if (error) {
        this.setState(error);
      } else {
        this.setState({ players, error: null });
      }
    });
  }

  validateMatch() {
    const teams = this.state.teams;
    for (const team in teams) {
      if (teams[team].players.length !== 2) {
        return false;
      }
    }
    return true;
  }

  createNewMatch() {
    const { startTime, teams } = this.state;
    const roundId = this.props.roundId;
    if (!this.validateMatch()) {
      this.setState({ error: "Must select two players per team" });
      return;
    }
    axios
      .post("/match/create", { startTime, teams, roundId })
      .then(res => {
        const error = res.data.error;
        if (error) {
          this.setState({ error });
        } else {
          window.location.reload();
        }
        console.log("Match sucessfully created: ", res.data);
      })
      .catch(error => {
        //TODO: Figure out how to pass a custom error message with a failure status
        this.setState({ error: "An error occured" });
      });
  }

  handleAddPlayer(team, player) {
    const teams = this.state.teams;
    teams[team].players.push(player.name);
    this.setState({ teams });
  }

  render() {
    return (
      <form>
        <div>
          Match Start Time:
          <input
            type="time"
            value={this.state.startTime}
            onChange={e => this.setState({ startTime: e.target.value })}
            style={{ margin: "10px" }}
          />
        </div>
        {/* TODO: Make a TeamSelect component */}
        <button
          onClick={() =>
            this.setState({ selectTeam1: !this.state.selectTeam1 })
          }
        >
          Select Team 1
        </button>
        <div id="team1">
          {this.state.selectTeam1
            ? this.state.players.map(player => (
                <div key={`player:${player.name}`}>
                  <input
                    type="checkbox"
                    onChange={e => this.handleAddPlayer(0, player)}
                  />
                  {player.name}
                </div>
              ))
            : ""}
        </div>
        <button
          onClick={() =>
            this.setState({ selectTeam2: !this.state.selectTeam2 })
          }
        >
          Select Team 2
        </button>
        <div id="team1">
          {this.state.selectTeam2
            ? this.state.players.map(player => (
                <div key={`player:${player.name}`}>
                  <input
                    type="checkbox"
                    onChange={e => this.handleAddPlayer(1, player)}
                  />
                  {player.name}
                </div>
              ))
            : ""}
        </div>
        <div>
          <button onClick={this.createNewMatch}>Submit</button>
        </div>
        <div style={{ color: "red" }}>
          {this.state.error ? this.state.error : ""}
        </div>
      </form>
    );
  }
}

export default CreateMatch;
