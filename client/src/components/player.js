import React, { Component } from "react";
import Axios from "axios";

class Player extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      email: "",
      edit: false
    };
    this.editPlayer = this.editPlayer.bind(this);
  }

  deletePlayer() {
    const name = this.props.player.name;
    Axios.delete("/player", { params: { name } })
      .then(res => window.location.reload)
      .catch(err => console.error(`Error while attempting to delete ${name}`));
  }

  editPlayer() {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    const edit = this.state.edit;
    return (
      <div>
        {this.props.player.name}
        <button onClick={this.editPlayer}>Edit Player</button>
        <button onClick={this.deletePlayer}>Delete Player</button>
        {edit && (
          <input
            type="text"
            value={
              this.state.name === "" ? this.props.player.name : this.state.name
            }
            placeholder=""
            onChange={e => this.setState({ name: e.target.value })}
          />
        )}
      </div>
    );
  }
}

export default Player;
