import { PokerHandService, Card, HandScore } from './PokerHands.service';
import { HandValue } from './../types/index.type';
describe('Poker Hands Manager', () => {
  describe('|-> Main class', () => {
    let handsManager: PokerHandService;
    beforeEach(() => {
      handsManager = new PokerHandService();
    });
    describe('|-> Validation', () => {
      const invalidHandStringCases: [string, any, string][] = [
        ['empty string', '', 'hand is empty'],
        ['less than 5 cards', '2H 3D 5S 9C', 'hand must have 5 cards'],
        ['more than 5 cards', '2H 3D 5S 9C KD AD', 'hand must have 5 cards'],
        ['invalid color card', '2W 3D 5S 9C KD', '2W is not a valid card'],
        ['invalid card value', '0H 3D 5S 9C KD', '0H is not a valid card'],
        ['duplicated cards', '2H 3D 5S 9C 9C', 'identical cards not allowed'],
      ];

      test.each(invalidHandStringCases)('should throw Error if hand has %s', (_, invalidHandString, error) => {
        expect(() => handsManager.analyzeHand(invalidHandString)).toThrow(error);
      });
    });
    describe('|-> Ranking', () => {
      describe('|-> Simple Cases', () => {
        it('should rank two high cards', () => {
          const highCardHandString = '2C 3D 5S 9C AS';
          const smallCardHandString = '4H 8D TS 9H KS';

          const [first, second] = handsManager.getRankedHandsScores(smallCardHandString, highCardHandString);
          expect(first.value).toEqual(HandValue.HighCard);
          expect(first.cards).toEqual(['AS']);
          expect(second.value).toEqual(HandValue.HighCard);
          expect(second.cards).toEqual(['KS']);
        });
        it('should rank a Pair > HighCard', () => {
          const highCardHandString = '2C 3D 5S 9C KS';
          const pairHandString = '2C 2D 5H 9C KD';
          const [first, second] = handsManager.getRankedHandsScores(highCardHandString, pairHandString);
          expect(first.value).toEqual(HandValue.Pair);
          expect(first.cards).toEqual(['2C', '2D']);
          expect(second.value).toEqual(HandValue.HighCard);
          expect(second.cards).toEqual(['KS']);
        });

        it('should rank Two Pairs > Pair', () => {
          const twoPairHandString = 'QC QD 5S 5C KS';
          const pairHandString = '2S 2D 5H 9C KD';
          const [first, second] = handsManager.getRankedHandsScores(twoPairHandString, pairHandString);
          expect(first.value).toEqual(HandValue.TwoPairs);
          expect(first.cards).toEqual(['QC', 'QD', '5S', '5C']);
          expect(second.value).toEqual(HandValue.Pair);
          expect(second.cards).toEqual(['2S', '2D']);
        });

        it('should rank x numbers of hands', () => {
          const twoPairHandString = 'TC TD 5S 5C KS';
          const pairHandString = '2S 2D 5H 9C KD';
          const threeOfAKindHandString = '8S 2D 8H 9C 8D';
          const fullHouseHandString = 'QD QS 3D 3H 3S';
          const [first, second, third, four] = handsManager.getRankedHandsScores(
            twoPairHandString,
            pairHandString,
            threeOfAKindHandString,
            fullHouseHandString,
          );
          expect(first.value).toEqual(HandValue.FullHouse);
          expect(first.cards).toEqual(fullHouseHandString.split(' '));
          expect(second.value).toEqual(HandValue.ThreeOfAKind);
          expect(second.cards).toEqual(['8S', '8H', '8D']);
          expect(third.value).toEqual(HandValue.TwoPairs);
          expect(third.cards).toEqual(['TC', 'TD', '5S', '5C']);
          expect(four.value).toEqual(HandValue.Pair);
          expect(four.cards).toEqual(['2S', '2D']);
        });
      });
      describe('|-> Draws', () => {
        it('should rank two pairs according to high card value', () => {
          const smallPairHandString = '2C 2D 3H 9C KD';
          const highPairHandString = '4C 6D 5H KC KS';
          const [first, second] = handsManager.getRankedHandsScores(smallPairHandString, highPairHandString);
          expect(first.value).toEqual(HandValue.Pair);
          expect(first.cards).toEqual(['KC', 'KS']);
          expect(second.value).toEqual(HandValue.Pair);
          expect(second.cards).toEqual(['2C', '2D']);
        });
        it('should rank two equal pairs according kicker value', () => {
          let smallKickerPairHandString = 'AC 2D 3H 9C AD';
          let highKickerPairHandString = 'AS AH 5H KC TS';
          let [first, second] = handsManager.getRankedHandsScores(smallKickerPairHandString, highKickerPairHandString);
          expect(first.value).toEqual(HandValue.Pair);
          expect(first.cards).toEqual(['AS', 'AH']);
          expect(second.value).toEqual(HandValue.Pair);
          expect(second.cards).toEqual(['AC', 'AD']);

          smallKickerPairHandString = 'AC KD 3H TC AD';
          highKickerPairHandString = 'AS AH 5H KC TS';
          [first, second] = handsManager.getRankedHandsScores(smallKickerPairHandString, highKickerPairHandString);
          expect(first.value).toEqual(HandValue.Pair);
          expect(first.cards).toEqual(['AS', 'AH']);
          expect(second.value).toEqual(HandValue.Pair);
          expect(second.cards).toEqual(['AC', 'AD']);
        });

        it('should rank 2 Three of a kind', () => {
          let smallTOAK = '2C 2D 3H 9C 2H';
          let highTOAK = 'AS AH 5H AC TS';
          let [first, second] = handsManager.getRankedHandsScores(smallTOAK, highTOAK);
          expect(first.value).toEqual(HandValue.ThreeOfAKind);
          expect(first.cards).toEqual(['AS', 'AH', 'AC']);
          expect(second.value).toEqual(HandValue.ThreeOfAKind);
          expect(second.cards).toEqual(['2C', '2D', '2H']);
        });
      });
    });
    describe('|-> Output', () => {
      const outputTestCases: [string | undefined, string, string[]][] = [
        ['John', 'High Card', ['2H 3D 5S 9C KD', '2C 3H 4S 8C AH']],
        ['Bob', 'Full House', ['2H 4S 4C 2D 4H', '2S 8S AS QS 3S']],
        ['Bob', 'High Card', ['2H 3D 5S 9C KD', '2C 3H 4S 8C KH']],
        [undefined, 'Tie', ['2H 3D 5S 9C KD', '2D 3H 5C 9S KH']],
      ];
      test.each(outputTestCases)('it should return winner %s with %s when hands are %p', (player, result, hands) => {
        const players = ['Bob', 'John'];
        expect(handsManager.outputWinner(players, hands).player).toEqual(player);
        expect(handsManager.outputWinner(players, hands).result).toEqual(result);
      });
    });
  });
  describe('|-> Hand class', () => {
    let pokerHandsManager: PokerHandService;
    beforeEach(() => {
      pokerHandsManager = new PokerHandService();
    });
    it('should have an array of Cards  class when instantiated with handString', () => {
      const hand = pokerHandsManager.analyzeHand('2H 3D 5S 9C KD');
      expect(hand.cards).toHaveLength(5);
      for (let i = 0; i < 5; i++) {
        expect(hand.cards[i]).toBeInstanceOf(Card);
      }
    });

    it('should have a getResult method that returns an HandScore instance', () => {
      const hand = pokerHandsManager.analyzeHand('2H 3D 5S 9C KD');
      expect(hand.getScore()).toBeInstanceOf(HandScore);
    });
  });
  describe('|-> HandScore class', () => {
    let pokerHandsManager: PokerHandService;
    beforeEach(() => {
      pokerHandsManager = new PokerHandService();
    });

    it('should return high card', () => {
      let hand = pokerHandsManager.analyzeHand('2H 3D 5S 9C KD');
      let score = hand.getScore();
      expect(score.cards).toEqual(['KD']);
      expect(score.value).toEqual('High Card');
      hand = pokerHandsManager.analyzeHand('2H 3D 5S AC KD');
      score = hand.getScore();
      expect(score.cards).toEqual(['AC']);
      expect(score.value).toEqual('High Card');
    });

    it('should return a Pair', () => {
      let hand = pokerHandsManager.analyzeHand('KH 3D 5S AC KD');
      let score = hand.getScore();
      expect(score.cards.sort()).toEqual(['KH', 'KD'].sort());
      expect(score.value).toEqual('Pair');
      hand = pokerHandsManager.analyzeHand('2H 2D 5S 9C KD');
      score = hand.getScore();
      expect(score.cards.sort()).toEqual(['2H', '2D'].sort());
      expect(score.value).toEqual('Pair');
    });

    it('should return a Double Pair', () => {
      let hand = pokerHandsManager.analyzeHand('KH 3D 3S AC KD');
      let score = hand.getScore();
      expect(score.cards).toEqual(['KH', '3D', '3S', 'KD']);
      expect(score.value).toEqual('Two Pairs');
      hand = pokerHandsManager.analyzeHand('2H 2D 5S 5C KD');
      score = hand.getScore();
      expect(score.cards).toEqual(['2H', '2D', '5S', '5C']);
      expect(score.value).toEqual('Two Pairs');
    });

    it('should return a Three Of A Kind', () => {
      let hand = pokerHandsManager.analyzeHand('KH 3D 9S KC KD');
      let score = hand.getScore();
      expect(score.cards).toEqual(['KH', 'KC', 'KD']);
      expect(score.value).toEqual('Three of a kind');
      hand = pokerHandsManager.analyzeHand('2H 2D 2S 5C KD');
      score = hand.getScore();
      expect(score.cards).toEqual(['2H', '2D', '2S']);
      expect(score.value).toEqual('Three of a kind');
    });

    it('should return a Straight', () => {
      let handString = '6D 3D 2H 4S 5C';
      let hand = pokerHandsManager.analyzeHand(handString);
      let score = hand.getScore();
      expect(score.cards).toEqual(handString.split(' '));
      expect(score.value).toEqual('Straight');
      handString = 'TH JD 9S 8C QD';
      hand = pokerHandsManager.analyzeHand(handString);
      score = hand.getScore();
      expect(score.cards).toEqual(handString.split(' '));
      expect(score.value).toEqual('Straight');
    });

    it('should return a Flush', () => {
      let handString = 'QD 3D TD 4D 5D';
      let hand = pokerHandsManager.analyzeHand(handString);
      let score = hand.getScore();
      expect(score.cards).toEqual(handString.split(' '));
      expect(score.value).toEqual('Flush');
      handString = 'AH JH 2H 8H 7H';
      hand = pokerHandsManager.analyzeHand('AH JH 2H 8H 7H');
      score = hand.getScore();
      expect(score.cards).toEqual(handString.split(' '));
      expect(score.value).toEqual('Flush');
    });

    it('should return a Full House', () => {
      let hand = pokerHandsManager.analyzeHand('QD QS TD TH TS');
      let score = hand.getScore();
      expect(score.cards).toEqual(['QD', 'QS', 'TD', 'TH', 'TS']);
      expect(score.value).toEqual('Full House');
      hand = pokerHandsManager.analyzeHand('2H 8H 2C 8S 2D');
      score = hand.getScore();
      expect(score.cards).toEqual(['2H', '8H', '2C', '8S', '2D']);
      expect(score.value).toEqual('Full House');
    });

    it('should return a Four of a Kind', () => {
      let hand = pokerHandsManager.analyzeHand('QD QC QH 2S QS');
      let score = hand.getScore();
      expect(score.cards).toEqual(['QD', 'QC', 'QH', 'QS']);
      expect(score.value).toEqual('Four of a kind');
      hand = pokerHandsManager.analyzeHand('2H 2C 8S 2D 2S');
      score = hand.getScore();
      expect(score.cards).toEqual(['2H', '2C', '2D', '2S']);
      expect(score.value).toEqual('Four of a kind');
    });

    it('should return a Straight Flush', () => {
      let hand = pokerHandsManager.analyzeHand('TH AH JH QH KH');
      let score = hand.getScore();
      expect(score.cards).toEqual(['TH', 'AH', 'JH', 'QH', 'KH']);
      expect(score.value).toEqual('Straight Flush');
      hand = pokerHandsManager.analyzeHand('2H 4H 3H 6H 5H');
      score = hand.getScore();
      expect(score.cards).toEqual(['2H', '4H', '3H', '6H', '5H']);
      expect(score.value).toEqual('Straight Flush');
    });
  });
});
