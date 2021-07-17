import { PokerDealService } from "./PokerDeal.service";

describe("|-> Deal service", () => {
  let deal: PokerDealService;
  beforeEach(() => {
    deal = new PokerDealService("Alice", "Bob", "John");
  });
  it("should have a Deal service class", () => {
    expect(PokerDealService).toBeDefined();
  });

  it("should be instantiated with player names", () => {
    expect(deal.players).toEqual(["Alice", "Bob", "John"]);
  });

  describe("|->Main Class", () => {
    const players = ["Alice", "Bob", "John"];
    it("should return deal count, dealer, blind and big blind players", () => {
      const expectedResult = {
        count: 1,
        dealer: "Alice",
        blind: "Bob",
        bigBlind: "John",
        players,
      };
      expect(deal.getStatus()).toEqual(expectedResult);
    });

    it("should rotate the roles when close() is called", () => {
      const firstStatus = {
        count: 1,
        dealer: "Alice",
        blind: "Bob",
        bigBlind: "John",
        players,
      };

      const secondStatus = {
        count: 2,
        dealer: "Bob",
        blind: "John",
        bigBlind: "Alice",
        players,
      };

      const thirdStatus = {
        count: 3,
        dealer: "John",
        blind: "Alice",
        bigBlind: "Bob",
        players,
      };

      const fourthStatus = { ...firstStatus, count: 4 };
      const fifthStatus = { ...secondStatus, count: 5 };

      expect(deal.getStatus()).toEqual(firstStatus);
      deal.close();
      expect(deal.getStatus()).toEqual(secondStatus);
      deal.close();
      expect(deal.getStatus()).toEqual(thirdStatus);
      deal.close();
      expect(deal.getStatus()).toEqual(fourthStatus);
      deal.close();
      expect(deal.getStatus()).toEqual(fifthStatus);
    });
  });
});
