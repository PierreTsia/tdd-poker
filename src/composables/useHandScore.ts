import { PokerHandService } from '/@/core/hands/PokerHands.service';
import { PokerDeckService as Deck } from '/@/core/deck/PokerDeck.service';

export const useHandScore = () => {
  const handsScoreService: PokerHandService = new PokerHandService();
  let deck!: Deck;

  const dealCards = (count: number): string[] => {
    return deck.deal(count).map(c => c.slug);
  };

  const compareHands = (hands: string[], players: string[]) => {
    return handsScoreService.outputWinner(players, hands);
  };

  const distribute = (cardToDistribute: number, playersCount = 2): string[] => {
    deck = new Deck();
    deck.shuffle();
    return [...Array(cardToDistribute).keys()].reduce(
      ([first, second], i) => {
        const card = dealCards(1)[0];
        if (i % 2 === 0) {
          first += i === 0 ? card : ` ${card}`;
        } else {
          second += i === 1 ? card : ` ${card}`;
        }
        return [first, second];
      },
      [...Array(playersCount).fill('')],
    );
  };

  return { compareHands, distribute };
};
