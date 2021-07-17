import { PokerDeckService } from "../deck/PokerDeck.service";
import { PokerDealService } from "../deal/PokerDeal.service";
import { HandState } from "./../types/index.type";
import { Card } from "./../hands/PokerHands.service";

const cardsCountMap: Map<HandState, number> = new Map([
  [HandState.PreFlop, 0],
  [HandState.Flop, 3],
  [HandState.Turn, 1],
  [HandState.River, 1],
]);

interface GameState {
  handState: HandState;
}

export class TexasHoldEmService {
  players: string[] = [];
  playerCards: Card[][] = [];
  commonCards: Card[] = [];
  deckService: PokerDeckService = new PokerDeckService();
  dealService!: PokerDealService;
  private currentHandState!: HandState;
  private readonly _HandStates = Object.values(HandState);

  constructor() {}

  public getState(): GameState {
    return { handState: this.currentHandState };
  }
  public start(players: string[]): void {
    this.players = players;
    this.dealService = new PokerDealService(...players);
    this.deckService.shuffle();
    this.startTurn();
  }

  public closeTurn(): void {
    if (this.currentHandState !== HandState.River && !this.isRiverOver) {
      throw new Error(`Can't close turn before end`);
    }
    this.dealService.close();
    this.startTurn();
  }

  public nextState(): void {
    if (this.isRiver) {
      throw new Error(`Current state is ${HandState.River}`);
    }
    this.currentHandState = this._HandStates[this.stateIndex + 1];
  }

  public dealPlayerCards() {
    if (this.isPlayersCardsDealt) {
      throw new Error("Player Cards dealt already");
    }
    const cardsCount = 2;
    const offset =
      this.players.indexOf(this.dealService.getStatus().dealer) + 1;
    this.playerCards = this.getDistributedCards(
      cardsCount,
      this.players.length,
      offset
    );
  }

  private getDistributedCards(
    cardsCount: number,
    playersCount: number,
    offset: number
  ) {
    return [...Array(cardsCount)].reduce((acc) => {
      [...Array(playersCount)].forEach((_: any, plyIndex: number) => {
        const card = this.deckService.deal(1)[0];
        const index =
          plyIndex + offset >= playersCount
            ? (plyIndex + offset) % playersCount
            : plyIndex + offset;
        if (!acc[index]) {
          acc[index] = [card];
        } else {
          acc[index].push(card);
        }
      });
      return acc;
    }, []);
  }

  public dealCommonCards() {
    if (this.currentHandState === HandState.PreFlop) {
      throw new Error(`Can't deal common cards before ${HandState.PreFlop}`);
    } else if (this.isDealingOver) {
      throw new Error(
        `Common Cards dealt already for ${this.currentHandState}`
      );
    }
    const cardsCount = cardsCountMap.get(this.currentHandState)!;
    this.commonCards = [
      ...this.commonCards,
      ...this.deckService.deal(cardsCount),
    ];
  }

  private get stateIndex(): number {
    return this._HandStates.indexOf(this.currentHandState);
  }

  private get isRiver(): boolean {
    return this.stateIndex === this._HandStates.length - 1;
  }

  private startTurn(): void {
    this.playerCards = [];
    this.commonCards = [];
    this.currentHandState = HandState.PreFlop;
  }

  private get isDealingOver(): boolean {
    return this.isFlopOver || this.isTurnOver || this.isRiverOver;
  }

  private get isFlopOver() {
    return (
      this.currentHandState === HandState.Flop && this.commonCards.length === 3
    );
  }

  private get isTurnOver() {
    return (
      this.currentHandState === HandState.Turn && this.commonCards.length === 4
    );
  }

  private get isRiverOver() {
    return (
      this.currentHandState === HandState.River && this.commonCards.length === 5
    );
  }

  private get isPlayersCardsDealt(): boolean {
    return !!(
      this.currentHandState === HandState.PreFlop &&
      this.playerCards.length &&
      this.playerCards.every((cards) => cards.length === 2)
    );
  }
}
