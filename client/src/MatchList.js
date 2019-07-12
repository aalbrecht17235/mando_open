import React, { Component } from "react";
import Axios from "axios";
import Match from "./components/match";
import CreateMatch from "./components/CreateMatch";

class MatchList extends Component {
  constructor(props) {
    super();
    this.state = {
      matches: [],
      error: null
    };
  }
  componentDidMount() {
    Axios.get("/match")
      .then(res => {
        console.log("Match results: ", res.data);
        this.setState({ matches: res.data.matches, error: null });
      })
      .catch(error => {
        console.error("Error while retreiving matches.", error);
        this.setState({ error });
      });
  }
  render() {
    return (
      <div>
        <div>Match List</div>
        <div>
          {this.state.matches.map(match => (
            <Match key={`match${match.startTime}`} match={match} />
          ))}
        </div>
        <div>
          <CreateMatch roundId={this.props.roundId} />
        </div>
      </div>
    );
  }
}

export default MatchList;
