import { Card, PokerHandService } from '/@/core/hands/PokerHands.service';
import { TexasHoldEmService } from '/@/core/game/TexasHoldEm.service';

export const useHandScore = () => {
  const handsScoreService: PokerHandService = new PokerHandService();
  const gameService: TexasHoldEmService = new TexasHoldEmService();

  const compareHands = (hands: string[], players: string[]) => {
    return handsScoreService.outputWinner(players, hands);
  };

  const start = (players: string[]) => {
    gameService.start(players);
  };

  const reset = () => {
    gameService.deckService.shuffle();
  };

  const distribute = (cardToDistribute: number, playersCount = 2): string[] => {
    const hands = gameService.distributeCard(cardToDistribute, playersCount, 0);
    return hands.map((hand: Card[]) => hand.map(c => c?.slug).join(' '));
  };

  return { compareHands, distribute, start, reset };
};
