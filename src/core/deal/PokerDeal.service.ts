export interface DealStatus {
  players: string[];
  count: number;
  dealer: string;
  blind: string;
  bigBlind: string;
}

export class PokerDealService {
  readonly players: string[] = [];
  count: number = 0;
  dealer!: string;
  blind!: string;
  bigBlind!: string;
  constructor(...players: string[]) {
    this.players = players;
    this.assignRoles();
    this.count++;
  }

  private assignRoles() {
    const [d, b, bb] = this.rolesIndices();
    this.dealer = this.players[d];
    this.blind = this.players[b];
    this.bigBlind = this.players[bb];
  }

  private rolesIndices(): number[] {
    const dealer = this.getDealerIndex();
    const blind = dealer < this.players.length - 1 ? dealer + 1 : 0;
    const bigBlind = blind < this.players.length - 1 ? blind + 1 : 0;
    return [dealer, blind, bigBlind];
  }

  private getDealerIndex() {
    return this.count > this.players.length - 1
      ? this.count % this.players.length
      : this.count;
  }

  public getStatus(): DealStatus {
    return {
      players: this.players,
      count: this.count,
      dealer: this.dealer,
      blind: this.blind,
      bigBlind: this.bigBlind,
    };
  }
  public close() {
    this.assignRoles();
    this.count++;
  }
}
