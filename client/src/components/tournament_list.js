import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default class TournamentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: []
    };
  }
  componentDidMount() {
    axios.get("/tournament/").then(res => {
      console.log(" CALL MADE TO GET TOURNAMAENTS :", res.data);
      this.setState({ tournaments: res.data.tournaments });
    });
  }
  render() {
    return (
      <div>
        <h1>Tournament List</h1>
        <ul>
          <li>
            <NavLink to="/tournament">Tourney 1</NavLink>
          </li>
          <li>
            <NavLink to="/tournament/create">Create a Tournament</NavLink>
          </li>
          {this.state.tournaments.map(tournament => {
            const tournamentName = tournament.name;
            return (
              <li key={`tournament:${tournamentName}li`}>
                <NavLink
                  key={`tournament:${tournamentName}`}
                  to={`/tournament/${tournamentName}`}
                >
                  {`${tournamentName}`}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
