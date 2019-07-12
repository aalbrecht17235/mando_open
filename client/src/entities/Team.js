class Team {
  constructor(name) {
    this.team = { players: [], name };
    // this.addPlayer = this.addPlayer.bind(this);
    return this.team;
  }
  // TODO: Figure out how to do object oriented programming in JS!
  // addPlayer(player) {
  //   if (this.team.players.contains(player)) {
  //     console.error("Player already in team");
  //     return false;
  //   } else {
  //     this.team.players.push(player);
  //     return true;
  //   }
  // }
}

export default Team;
