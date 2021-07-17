import {PokerDeckService} from "./PokerDeck.service";
import { Card } from "./../hands/PokerHands.service";
import { CardValue, Color } from "./../types/index.type";

describe("Poker Cards Deck Service", () => {
  describe("|-> Main Class", () => {
    it("should be defined", () => {
      expect(PokerDeckService).toBeDefined();
    });

    it("should be have a 52 cards class array when instantiated", () => {
      const deck = new PokerDeckService();
      expect(deck.cards).toHaveLength(52);
      deck.cards.forEach((c) => expect(c).toBeInstanceOf(Card));
    });

    const colors = Object.entries(Color);
    test.each(colors)("should have 13 ranked %s Cards", (_, value) => {
      const deck = new PokerDeckService();
      const colorCards = deck.cards.filter(({ color }) => color === value);
      expect(colorCards).toHaveLength(13);
      Object.values(CardValue).forEach((value, i) => {
        expect(colorCards[i].value).toEqual(value);
      });
    });
  });

  it("should have a shuffle method that change the order of the cards every time it is called", () => {
    const deck = new PokerDeckService();
    const sortedDeckString = deck.cards
      .map((c) => c.slug)
      .sort()
      .join(" ");
    deck.shuffle();
    const shuffleDeckString = deck.cards.map((c) => c.slug).join(" ");
    const shuffleSortedDeckString = deck.cards
      .map((c) => c.slug)
      .sort()
      .join(" ");
    expect(shuffleDeckString).not.toEqual(sortedDeckString);
    expect(shuffleSortedDeckString).toEqual(sortedDeckString);
  });

  it("should have a deal method", () => {
    const deck = new PokerDeckService();
    expect(deck.deal).toBeDefined();
  });
  it("deal(1) should return the first deck card", () => {
    const deck = new PokerDeckService();
    deck.shuffle();
    const firstDeckCard = deck.cards[0].slug;
    expect(deck.deal(1)[0].slug).toEqual(firstDeckCard);
    const newFirstDeckCard = deck.cards[0].slug;
    expect(newFirstDeckCard).not.toEqual(firstDeckCard);
    expect(deck.cards).toHaveLength(51);
  });

  it("deal(3) should return the first 3 deck card", () => {
    const deck = new PokerDeckService();
    deck.shuffle();
    const firstDeckCard = deck.cards[0].slug;
    const secondDeckCard = deck.cards[1].slug;
    const thirdDeckCard = deck.cards[2].slug;
    const dealt = deck.deal(3)
    expect(dealt).toHaveLength(3)
    expect(dealt[0].slug).toEqual(firstDeckCard);
    expect(dealt[1].slug).toEqual(secondDeckCard);
    expect(dealt[2].slug).toEqual(thirdDeckCard);

    expect(deck.cards).toHaveLength(49);
  });
});
