import React, { Component } from "react";
import axios from "axios";
import Player from "./Player";
import CreatePlayer from "./CreatePlayer";

export class PlayerList extends Component {
  constructor(props) {
    super();
    this.state = {
      players: [],
      error: null
    };
  }
  componentDidMount() {
    axios
      .get("/player")
      .then(res =>
        res.data.error
          ? this.setState({ error: res.data.error })
          : this.setState({ players: res.data.players, error: res.data.error })
      );
  }
  render() {
    const players = this.state.players;
    return (
      <div>
        {players.map(player => (
          <Player key={`player:${player.name}`} player={player} />
        ))}
        <CreatePlayer />
      </div>
    );
  }
}

export default PlayerList;
