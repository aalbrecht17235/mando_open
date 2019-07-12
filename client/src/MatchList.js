import React, { Component } from "react";
import Axios from "axios";
import Match from "./components/match";
import CreateMatch from "./components/CreateMatch";

class MatchList extends Component {
  constructor(props) {
    super();
    this.state = {
      matches: [],
      reload: false,
      error: null
    };
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    Axios.get("/match", { params: { roundId: this.props.roundId } })
      .then(res => {
        console.log("Match results: ", res.data);
        this.setState({ matches: res.data.matches, error: null });
      })
      .catch(error => {
        console.error("Error while retreiving matches.", error);
        this.setState({ error });
      });
  }

  reload() {
    console.log("RELOADING MATCHLLIST ");
    this.setState({ reload: !this.state.reload });
  }
  render() {
    return (
      <div style={{ border: "2px solid orange" }}>
        <div>Match List</div>
        <div>
          {this.state.matches.map(match => (
            <Match key={`match${match.startTime}`} match={match} />
          ))}
        </div>
        <div>
          <CreateMatch
            renderParent={this.reload}
            roundId={this.props.roundId}
          />
        </div>
      </div>
    );
  }
}

export default MatchList;
