import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class TournamentList extends Component {
  render() {
    return (
      <div>
      <h1>Tournament List</h1>
      <ul>
          <li><NavLink to="/tournament">Tourney 1</NavLink></li>
      </ul>
      </div>
    );
  }
}