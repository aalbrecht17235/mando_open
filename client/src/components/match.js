import React, { Component } from "react";

export class Match extends Component {
  render() {
    const { teams, startTime } = this.props.match;
    return (
      <div style={{ border: "2px solid blue", margin: "5px" }}>
        <div>This is a match</div>
        <div>Start Time: {startTime}</div>
        <div>
          {teams
            ? teams.map(team => (
                <div
                  key={`team:${team.name}`}
                  style={{ border: "2px solid yellow", margin: "5px" }}
                >
                  {`${team.name}`}
                  {team.players.map(player => (
                    <p key={player + "team1"}>{player}</p>
                  ))}
                </div>
              ))
            : ""}
        </div>
      </div>
    );
  }
}

export default Match;
