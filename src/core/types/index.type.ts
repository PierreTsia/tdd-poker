import { Card } from "./../hands/PokerHands.service";

export enum Color {
  Clubs = "C",
  Diamonds = "D",
  Hearts = "H",
  Spade = "S",
}

export enum CardValue {
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "T",
  Jack = "J",
  Queen = "Q",
  King = "K",
  Ace = "A",
}

export enum HandValue {
  HighCard = "High Card",
  Pair = "Pair",
  TwoPairs = "Two Pairs",
  ThreeOfAKind = "Three of a kind",
  Straight = "Straight",
  Flush = "Flush",
  FullHouse = "Full House",
  FourOfAKind = "Four of a kind",
  StraightFlush = "Straight Flush",
}

export type HandScoreResult = {
  value: HandValue;
  selectedCards: Card[];
};

export type TestHandFn = (args: Card[]) => Card[] | null;

export enum HandState {
  PreFlop = "Pre Flop",
  Flop = "Flop",
  Turn = "Turn",
  River = "River",
}
