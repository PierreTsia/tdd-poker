import { CardValue, Color, HandScoreResult, HandValue, TestHandFn } from '../types/index.type';

export class PokerHandService {
  private rank = new HandsRankingManager();
  analyzeHand(handString: string) {
    return new Hand(handString);
  }

  getRankedHandsScores(...handStrings: string[]): HandScore[] {
    return this.getRankedHands(handStrings).map(h => h.score);
  }

  private getRankedHands(handStrings: string[]) {
    return this.rank.sortHands(handStrings.map(hs => new Hand(hs)));
  }

  outputWinner(players: string[], handStrings: string[]): { player?: string; result: string; cards: string[] } {
    const hands = handStrings.map(hs => new Hand(hs));
    if (this.rank.isATie(hands)) {
      return { result: 'Tie', cards: [] };
    }
    const winningHand = this.getRankedHands(handStrings)[0];
    const index = handStrings.indexOf(winningHand.handString);
    return { player: players[index], result: winningHand.score.value, cards: winningHand.score.cards };
  }
}

export class HandsRankingManager {
  sortHands(hands: Hand[]): Hand[] {
    return hands.sort((h1, h2) => {
      if (this.isAWinnerHand(h1.score, h2.score)) {
        return this.firstHandWins(h1.score, h2.score) ? -1 : 1;
      } else {
        return this.sortDrawHands(h1.score, h2.score);
      }
    });
  }

  isATie(hands: Hand[]): boolean {
    const handsValues = hands.map(h => h.score.value);
    const handsHighCardsValues = this.getHandsHighCardsValues(hands);
    const restCards = hands.map(h => h.score.restCards.sort((c1, c2) => (c1.value > c2.value ? -1 : 1)));

    return (
      this.haveSameHandsValue(handsValues) &&
      this.haveSameHighCardValue(handsHighCardsValues) &&
      this.haveSameRestCardsValue(restCards)
    );
  }

  private haveSameRestCardsValue(restCards: Card[][]) {
    const restCardsValues: string[] = restCards.map(handCards => handCards.map(({ value }) => value).join(''));
    return restCardsValues.every(handValue => handValue === restCardsValues[0]);
  }

  private haveSameHandsValue(handsValues: HandValue[]) {
    return handsValues.every(handValue => handValue === handsValues[0]);
  }

  private haveSameHighCardValue(handsHighCardsValues: Card[][]) {
    return handsHighCardsValues.every(hand =>
      hand.every((cs, cIndex) => {
        return handsHighCardsValues[0][cIndex].value === cs.value;
      }),
    );
  }

  private getHandsHighCardsValues(hands: Hand[]) {
    return hands.map(h =>
      h.score.cards.sort((c1, c2) => (new Card(c1).value > new Card(c2).value ? -1 : 1)).map(cs => new Card(cs)),
    );
  }

  private isAWinnerHand(h1: HandScore, h2: HandScore) {
    return this.firstHandWins(h1, h2) || this.secondHandWins(h1, h2);
  }

  private sortDrawHands(h1: HandScore, h2: HandScore) {
    const [highestCard1, highestCard2] = [h1, h2].map(h => h1.rankCardsByValueDesc(h.cards.map(c => new Card(c)))[0]);
    if (this.isAWinnerCard(highestCard1, highestCard2)) {
      return this.firstCardWins(highestCard1, highestCard2) ? -1 : 1;
    } else {
      return this.sortByRestCards(h1, h2);
    }
  }

  private isAWinnerCard(highestCard1: Card, highestCard2: Card) {
    return this.firstCardWins(highestCard1, highestCard2) || this.secondCardWins(highestCard1, highestCard2);
  }

  private sortByRestCards(h1: HandScore, h2: HandScore) {
    let found = false;
    let result = 1;
    let i = 0;
    while (!found && i < h1.restCards.length) {
      if (this.firstCardWins(h1.restCards[i], h2.restCards[i])) {
        result = -1;
        found = true;
        return result;
      } else if (this.secondCardWins(h1.restCards[i], h2.restCards[i])) {
        result = 1;
        found = true;
        return result;
      }
      i++;
    }
    return result;
  }

  private getCardRank(value: CardValue) {
    return Object.values(CardValue).indexOf(value);
  }

  private getHandRank(value: HandValue) {
    return Object.values(HandValue).indexOf(value);
  }

  private secondHandWins(h1: HandScore, h2: HandScore) {
    return this.getHandRank(h1.value) < this.getHandRank(h2.value);
  }

  private firstHandWins(h1: HandScore, h2: HandScore) {
    return this.getHandRank(h1.value) > this.getHandRank(h2.value);
  }

  private secondCardWins(c1: Card, c2: Card) {
    return this.getCardRank(c1.value) < this.getCardRank(c2.value);
  }

  private firstCardWins(c1: Card, c2: Card) {
    return this.getCardRank(c1.value) > this.getCardRank(c2.value);
  }
}

export class Hand {
  public cards: Card[] = [];
  public handString!: string;
  private rules = new HandValidationService();

  constructor(handString: string) {
    this.handString = handString;
    this.rules.validate(handString);
    this.cards = this.mapCards(handString);
  }

  get score(): HandScore {
    return this.getScore();
  }

  private mapCards(handString: string) {
    return handString.split(' ').map(c => new Card(c));
  }

  public getScore(): HandScore {
    return new HandScore(this.cards);
  }
}

export class HandScore {
  public restCards: Card[] = [];
  public cards: string[] = [];
  public value!: HandValue;
  private orderedValue = Object.values(CardValue).reverse();
  private handValidationProps: [HandValue, TestHandFn][] = [
    [HandValue.StraightFlush, (cards: Card[]) => this.getStraightFlush(cards)],
    [HandValue.FourOfAKind, (cards: Card[]) => this.getFourOfAKind(cards)],
    [HandValue.FullHouse, (cards: Card[]) => this.getFullHouse(cards)],
    [HandValue.Flush, (cards: Card[]) => this.getFlush(cards)],
    [HandValue.Straight, (cards: Card[]) => this.getStraight(cards)],
    [HandValue.ThreeOfAKind, (cards: Card[]) => this.getThreeOfAKind(cards)],
    [HandValue.TwoPairs, (cards: Card[]) => this.getTwoPairs(cards)],
    [HandValue.Pair, (cards: Card[]) => this.getPair(cards)],
    [HandValue.HighCard, (cards: Card[]) => this.getHighCard(cards)],
  ];
  private scoreMap: Map<HandValue, { check: TestHandFn }> = new Map(
    this.handValidationProps.map(([value, fn]) => {
      return [value, { check: fn }];
    }),
  );

  constructor(cards: Card[]) {
    const originalCards = cards.map(c => c.slug);
    const { value, selectedCards } = this.scoreHandCards(cards);
    this.restCards = this.rankCardsByValueDesc(cards.filter(c => !selectedCards.includes(c)));
    this.value = value;
    this.cards = selectedCards
      .map(c => c.slug)
      .sort((c1, c2) => (originalCards.indexOf(c1) < originalCards.indexOf(c2) ? -1 : 1));
  }

  private scoreHandCards(cards: Card[]): HandScoreResult {
    const value = this.getHandValue(cards);

    return {
      value,
      selectedCards: this.scoreMap.get(value)!.check(cards)!,
    };
  }

  private getHandValue(cards: Card[]) {
    return Object.values(HandValue)
      .reverse()
      .find(handValue => this.scoreMap.get(handValue)!.check(cards))!;
  }

  private getHighCard(cards: Card[]): Card[] {
    const ranked = this.rankCardsByValueDesc(cards);
    return [ranked[0]];
  }

  private getPair(cards: Card[]): Card[] | null {
    const same = this.sameValueCards(cards);
    return same.find(s => s.length === 2) || null;
  }

  private getTwoPairs(cards: Card[]): Card[] | null {
    const twoPairs = this.sameValueCards(cards)
      .filter(s => s.length === 2)
      .filter((_, i) => i % 2 === 0);
    return twoPairs.length === 2 ? [...twoPairs[0], ...twoPairs[1]] : null;
  }

  private getThreeOfAKind(cards: Card[]): Card[] | null {
    return this.sameValueCards(cards).find(s => s.length === 3) || null;
  }

  private getStraight(cards: Card[]): Card[] | null {
    return this.isAStraight(cards) ? cards : null;
  }

  private getFlush(cards: Card[]): Card[] | null {
    return this.isAFlush(cards) ? cards : null;
  }

  private getFullHouse(cards: Card[]): Card[] | null {
    const [three, pair] = [this.getThreeOfAKind(cards), this.getPair(cards)];
    return three && pair ? [...three, ...pair] : null;
  }

  private getFourOfAKind(cards: Card[]): Card[] | null {
    const same = this.sameValueCards(cards);
    return same.find(s => s.length === 4) || null;
  }

  private getStraightFlush(cards: Card[]): Card[] | null {
    return this.isAStraight(cards) && this.isAFlush(cards) ? cards : null;
  }

  private sameValueCards(cards: Card[]): Card[][] {
    return cards.map(card => [card, ...cards.filter(c => c.value === card.value && c.color !== card.color)]);
  }

  private isAStraight(cards: Card[]): boolean {
    const rankedValues = this.rankCardsByValueDesc(cards).map(c => this.orderedValue.indexOf(c.value));
    return rankedValues.every((val, i) => i === rankedValues.length - 1 || val === rankedValues[i + 1] - 1);
  }

  private isAFlush(cards: Card[]): boolean {
    return cards.every(({ color }) => color === cards[0].color);
  }

  public rankCardsByValueDesc(cards: Card[]) {
    return cards.sort((c1, c2) => (this.orderedValue.indexOf(c1.value) > this.orderedValue.indexOf(c2.value) ? 1 : -1));
  }
}

export class Card {
  public color!: Color;
  public value!: CardValue;
  constructor(string: any) {
    const [val, col] = string.split('');
    this.color = col;
    this.value = val;
  }

  get slug(): string {
    return `${this.value}${this.color}`;
  }
}
export type ValidationFn = (args?: any) => ValidationResult;
export type ValidationResult = boolean | string;

export class HandValidationService {
  private rules: ValidationFn[] = [
    args => this.isNotEmpty(args),
    args => this.hasFiveUniqCards(args),
    args => this.allCardsAreValid(args),
  ];
  validate(handString: any): boolean {
    this.rules.forEach(fn => {
      const validationResult: ValidationResult = fn(handString);
      if (this.isError(validationResult)) {
        throw new Error(validationResult as string);
      }
    });
    return true;
  }

  private isNotEmpty(str: any): ValidationResult {
    return str.length || 'hand is empty';
  }

  private hasFiveUniqCards(str: any): ValidationResult {
    const cardStrings = str.split(' ');
    if (cardStrings.length !== 5) {
      return 'hand must have 5 cards';
    }

    const uniqCards = [...Array.from(new Set(cardStrings))];
    if (uniqCards.length !== 5) {
      return 'identical cards not allowed';
    }
    return true;
  }

  private allCardsAreValid(handString: any): ValidationResult {
    const cardStrings = handString.split(' ');
    const validations = cardStrings.map((cs: string) => this.isValidCard(cs));
    const error = validations.find(this.isError);
    return error || true;
  }

  private isValidCard(string: any): ValidationResult {
    const [val, col] = string.split('');

    return (this.isValidValue(val) && this.isValidColor(col)) || `${val}${col} is not a valid card`;
  }
  private isValidColor(col: any) {
    return Object.values(Color).includes(col);
  }
  private isValidValue(val: any) {
    return Object.values(CardValue).includes(val);
  }

  private isError(input: ValidationResult): boolean {
    return typeof input === 'string';
  }
}
