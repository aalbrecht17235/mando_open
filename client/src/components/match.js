import React, { Component } from "react";

export class Match extends Component {
  render() {
    return (
      <div>
        <div>This is a match</div>
        <div>{this.props.match.startTime}</div>
      </div>
    );
  }
}

export default Match;
