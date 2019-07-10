import React, { Component } from "react";
import MatchList from "../MatchList";

export class Round extends Component {
  handleClick() {}
  render() {
    return (
      <div>
        <div>Round number: test {this.props.round.number}</div>
        <div>
          <MatchList />
        </div>
      </div>
    );
  }
}

export default Round;
