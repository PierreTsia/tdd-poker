const DEFAULT_STACK = 1000;
export class PokerBetService {
  currentBets: number[] = [];
  pot: number = 0;
  private readonly players: string[] = [];

  stacks: Map<string, number> = new Map();
  constructor(players: string[], chipsAmount = DEFAULT_STACK) {
    this.players = players;
    this.resetPlayerBets();
    players.forEach(p => this.stacks.set(p, chipsAmount));
  }

  private resetPlayerBets() {
    this.currentBets = Array(this.players.length).fill(0);
  }

  public closeBets() {
    this.pot += this.tableChips;
    this.resetPlayerBets();
  }

  public bet(player: string, amount: number) {
    let currentStack = this.stacks.get(player)!;
    if (currentStack - amount < 0) {
      throw new Error(`Can't bet much than ${currentStack}`);
    }
    const playerIndex = this.players.indexOf(player);
    this.currentBets[playerIndex] = amount;
    this.stacks.set(player, (currentStack -= amount));
  }

  get tableChips(): number {
    return this.currentBets.reduce((sum, bet) => (sum += bet));
  }
}
