import { TexasHoldEmService as GameService } from "./TexasHoldEm.service";
import { HandState } from "./../types/index.type";
import { Card } from "./../hands/PokerHands.service";

describe("|-> Texas Hold Em Poker Game", () => {
  const players = ["Alice", "Bob", "John"];
  describe("|-> Hold'em Texas Poker", () => {
    let game: GameService;
    beforeEach(() => {
      game = new GameService();
    });
    it("should have a start function called with players", () => {
      expect(() => game.start(players)).not.toThrow();
    });
    it("should init a game with players and services", () => {
      expect(game.deckService).toBeDefined();
      game.start(players);
      expect(game.dealService).toBeDefined();
    });

    it("after start, we must be at pre flop stage", () => {
      game.start(players);
      expect(game.getState().handState).toEqual(HandState.PreFlop);
    });

    it("should have a nextState function that goes from pre flop -> flop -> turn -> river and throws exception if called after that", () => {
      game.start(players);
      game.nextState();
      expect(game.getState().handState).toEqual(HandState.Flop);
      game.nextState();
      expect(game.getState().handState).toEqual(HandState.Turn);
      game.nextState();
      expect(game.getState().handState).toEqual(HandState.River);
      expect(() => game.nextState()).toThrow(
        `Current state is ${HandState.River}`
      );
    });

    it("should have a dealPlayerCards fn Pre flop that deals pocket cards", () => {
      game.start(players);
      game.dealPlayerCards();
      expect(game.playerCards).toHaveLength(players.length);
      game.playerCards.forEach((h: Card[]) => {
        expect(h).toHaveLength(2);
        h.forEach((c) => expect(c).toBeInstanceOf(Card));
      });
      expect(() => game.dealPlayerCards()).toThrow();
    });
    it("should have a dealCommonCards fn from Flop", () => {
      game.start(players);
      expect(() => game.dealCommonCards()).toThrow();
      game.dealPlayerCards();
      game.nextState();
      expect(game.commonCards).toHaveLength(0);
      game.dealCommonCards();
      expect(game.commonCards).toHaveLength(3);
      expect(() => game.dealCommonCards()).toThrow();
      game.nextState();
      game.dealCommonCards();
      expect(game.commonCards).toHaveLength(4);
      expect(() => game.dealCommonCards()).toThrow();
      game.nextState();
      game.dealCommonCards();
      expect(game.commonCards).toHaveLength(5);
      expect(() => game.dealCommonCards()).toThrow();
      expect(() => game.nextState()).toThrow();
    });

    it("should have a close turn methods that resets players cards && common cards", () => {
      game.start(players);
      game.dealPlayerCards();
      expect(game.closeTurn).toBeDefined();
      game.nextState();
      expect(() => game.closeTurn()).toThrow();
      game.dealCommonCards();
      expect(() => game.closeTurn()).toThrow();
      game.nextState();
      game.dealCommonCards();
      expect(() => game.closeTurn()).toThrow();
      game.nextState();
      game.dealCommonCards();
      game.closeTurn();
      expect(game.getState().handState).toEqual(HandState.PreFlop);
      expect(game.playerCards).toHaveLength(0);
      expect(game.commonCards).toHaveLength(0);
    });

    it("should deal the pocket cards according to dealing order", () => {
      game.start(players);
      let dealt = game.deckService.cards.slice(0, 6).map((c) => c.slug);
      game.dealPlayerCards();
      // First turn dealer is player 1 => small blind is next player he receives first card
      expect(game.playerCards[1].map((c) => c.slug)).toEqual([
        dealt[0],
        dealt[3],
      ]);
      expect(game.playerCards[2].map((c) => c.slug)).toEqual([
        dealt[1],
        dealt[4],
      ]);
      expect(game.playerCards[0].map((c) => c.slug)).toEqual([
        dealt[2],
        dealt[5],
      ]);

      game.nextState();
      game.dealCommonCards();

      game.nextState();
      game.dealCommonCards();

      game.nextState();
      game.dealCommonCards();

      game.closeTurn();

      //next turn, blind has been updated
      dealt = game.deckService.cards.slice(0, 6).map((c) => c.slug);
      game.dealPlayerCards();
      expect(game.playerCards[2].map((c) => c.slug)).toEqual([
        dealt[0],
        dealt[3],
      ]);
      expect(game.playerCards[0].map((c) => c.slug)).toEqual([
        dealt[1],
        dealt[4],
      ]);
      expect(game.playerCards[1].map((c) => c.slug)).toEqual([
        dealt[2],
        dealt[5],
      ]);
    });
  });
});
