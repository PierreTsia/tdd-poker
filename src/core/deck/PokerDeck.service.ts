import { Card } from "./../hands/PokerHands.service";
import { CardValue, Color } from "./../types/index.type";

export class PokerDeckService {
  public cards: Card[] = [];
  constructor() {
    this.cards = this.generateCards();
  }

  public deal(count: number) {
    const dealt = this.cards.slice(0, count);
    this.cards.splice(0, count);
    return dealt;
  }

  public shuffle(): void {
    let cur = this.cards.length;
    let rand;
    while (cur !== 0) {
      rand = Math.floor(Math.random() * cur);
      cur--;
      [this.cards[cur], this.cards[rand]] = [this.cards[rand], this.cards[cur]];
    }
  }

  private getColorCards(color: Color): Card[] {
    return Object.values(CardValue).map((val) => new Card(`${val}${color}`));
  }

  private generateCards() {
    return Object.values(Color).reduce(
      (acc, color) => [...acc, ...this.getColorCards(color)],
      [] as Card[]
    );
  }
}
