import { Card } from './../hands/PokerHands.service';

export enum Color {
  Clubs = 'C',
  Diamonds = 'D',
  Hearts = 'H',
  Spade = 'S',
}

export enum CardValue {
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = 'T',
  Jack = 'J',
  Queen = 'Q',
  King = 'K',
  Ace = 'A',
}

export enum HandValue {
  HighCard = 'High Card',
  Pair = 'Pair',
  TwoPairs = 'Two Pairs',
  ThreeOfAKind = 'Three of a kind',
  Straight = 'Straight',
  Flush = 'Flush',
  FullHouse = 'Full House',
  FourOfAKind = 'Four of a kind',
  StraightFlush = 'Straight Flush',
}

export type HandScoreResult = {
  value: HandValue;
  selectedCards: Card[];
};

export type TestHandFn = (args: Card[]) => Card[] | null;

export enum HandState {
  PreFlop = 'Pre Flop',
  Flop = 'Flop',
  Turn = 'Turn',
  River = 'River',
}

export const cardUnicode: Map<string, string> = new Map([
  [`${CardValue.Ace}${Color.Spade}`, '1F0A1'],
  [`${CardValue.King}${Color.Spade}`, '1F0AE'],
  [`${CardValue.Queen}${Color.Spade}`, '1F0AD'],
  [`${CardValue.Jack}${Color.Spade}`, '1F0AB'],
  [`${CardValue.Ten}${Color.Spade}`, '1F0AA'],
  [`${CardValue.Nine}${Color.Spade}`, '1F0A9'],
  [`${CardValue.Eight}${Color.Spade}`, '1F0A8'],
  [`${CardValue.Seven}${Color.Spade}`, '1F0AB'],
  [`${CardValue.Six}${Color.Spade}`, '1F0AA'],
  [`${CardValue.Five}${Color.Spade}`, '1F0A9'],
  [`${CardValue.Four}${Color.Spade}`, '1F0A8'],
  [`${CardValue.Three}${Color.Spade}`, '1F0AB'],
  [`${CardValue.Two}${Color.Spade}`, '1F0AB'],




  [`${CardValue.Ace}${Color.Hearts}`, '1F0A1'],
  [`${CardValue.King}${Color.Hearts}`, '1F0AE'],
  [`${CardValue.Queen}${Color.Hearts}`, '1F0AD'],
  [`${CardValue.Jack}${Color.Hearts}`, '1F0AB'],
  [`${CardValue.Ten}${Color.Hearts}`, '1F0AB'],
  [`${CardValue.Nine}${Color.Hearts}`, '1F0AB'],
  [`${CardValue.Eight}${Color.Hearts}`, '1F0AB'],
  [`${CardValue.Seven}${Color.Hearts}`, '1F0AB'],

  [`${CardValue.Six}${Color.Hearts}`, '1F0AA'],
  [`${CardValue.Five}${Color.Hearts}`, '1F0A9'],
  [`${CardValue.Four}${Color.Hearts}`, '1F0A8'],
  [`${CardValue.Three}${Color.Hearts}`, '1F0AB'],
  [`${CardValue.Two}${Color.Hearts}`, '1F0AB'],


  [`${CardValue.Ace}${Color.Clubs}`, '1F0A1'],
  [`${CardValue.King}${Color.Clubs}`, '1F0AE'],
  [`${CardValue.Queen}${Color.Clubs}`, '1F0AD'],
  [`${CardValue.Jack}${Color.Clubs}`, '1F0AB'],
  [`${CardValue.Ten}${Color.Clubs}`, '1F0AB'],
  [`${CardValue.Nine}${Color.Clubs}`, '1F0AB'],
  [`${CardValue.Eight}${Color.Clubs}`, '1F0AB'],
  [`${CardValue.Seven}${Color.Clubs}`, '1F0AB'],
  [`${CardValue.Six}${Color.Clubs}`, '1F0AA'],
  [`${CardValue.Five}${Color.Clubs}`, '1F0A9'],
  [`${CardValue.Four}${Color.Clubs}`, '1F0A8'],
  [`${CardValue.Three}${Color.Clubs}`, '1F0AB'],
  [`${CardValue.Two}${Color.Clubs}`, '1F0AB'],



  [`${CardValue.Ace}${Color.Diamonds}`, '1F0A1'],
  [`${CardValue.King}${Color.Diamonds}`, '1F0AE'],
  [`${CardValue.Queen}${Color.Diamonds}`, '1F0AD'],
  [`${CardValue.Jack}${Color.Diamonds}`, '1F0AB'],
  [`${CardValue.Ten}${Color.Diamonds}`, '1F0AB'],
  [`${CardValue.Nine}${Color.Diamonds}`, '1F0AB'],
  [`${CardValue.Eight}${Color.Diamonds}`, '1F0AB'],
  [`${CardValue.Seven}${Color.Diamonds}`, '1F0AB'],
  [`${CardValue.Six}${Color.Diamonds}`, '1F0AA'],
  [`${CardValue.Five}${Color.Diamonds}`, '1F0A9'],
  [`${CardValue.Four}${Color.Diamonds}`, '1F0A8'],
  [`${CardValue.Three}${Color.Diamonds}`, '1F0AB'],
  [`${CardValue.Two}${Color.Diamonds}`, '1F0AB'],
]);
