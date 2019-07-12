import React, { Component } from "react";
import axios from "axios";

class CreatePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      error: null
    };
    this.createNewPlayer = this.createNewPlayer.bind(this);
  }
  // TODO: Add email validation, i.e. check for @ symbol and .com/.net/etc
  createNewPlayer() {
    const { name, email } = this.state;
    axios
      .post("/player/create", { name, email })
      .then(res => {
        const error = res.data.error;
        if (error) {
          this.setState({ error });
        } else {
          this.setState({ error: null });
          // TODO: find a better way to re-render the PLayerList component than just reloading the page
          window.location.reload();
        }
      })
      .catch(err =>
        console.error("Error occured while attempting to create match", err)
      );
  }

  render() {
    return (
      <form>
        <div>
          Player Information:
          <div>
            <input
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              style={{ margin: "10px" }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              style={{ margin: "10px" }}
            />
          </div>
          <button onClick={this.createNewPlayer}>Submit</button>
        </div>
        <div style={{ color: "red" }}>
          {this.state.error ? this.state.error : ""}
        </div>
      </form>
    );
  }
}

export default CreatePlayer;
