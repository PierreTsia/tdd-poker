import { PokerBetService } from './PokerBet.service';

describe('|-> Poker Bet Service', () => {
  const players = ['Alice', 'Bob', 'John'];
  let betService: PokerBetService;
  beforeEach(() => {
    betService = new PokerBetService(players, 100);
  });
  it('should be defined', () => {
    expect(PokerBetService).toBeDefined();
  });
  it('Should have a bet function that accepts a playerName and a betServi value', () => {
    expect(betService.bet).toBeDefined();
    betService.bet('Bob', 10);
    expect(betService.currentBets[1]).toEqual(10);
  });

  it('Should have a get tableChips() that sums the total of current bets', () => {
    betService.bet('Bob', 10);
    betService.bet('Alice', 10);
    betService.bet('John', 20);
    expect(betService.currentBets[1]).toEqual(10);
    expect(betService.currentBets[0]).toEqual(10);
    expect(betService.currentBets[2]).toEqual(20);
    expect(betService.tableChips).toEqual(40);
  });

  it('each player should have a stack of chips', () => {
    ['Alice', 'Bob', 'John'].forEach(p => {
      expect(typeof betService.stacks.get(p)).toEqual('number');
    });
  });

  it('should substract the bet value from a player stack', () => {
    betService.bet('Bob', 10);
    betService.bet('Alice', 10);
    betService.bet('John', 20);
    expect(betService.stacks.get('Bob')).toEqual(90);
    expect(betService.stacks.get('Alice')).toEqual(90);
    expect(betService.stacks.get('John')).toEqual(80);
  });

  it('should throw an error if player bet exceeds stack ', () => {
    expect(() => betService.bet('John', 200)).toThrow();
    expect(betService.stacks.get('John')).toEqual(100);
  });

  it('should have a pot that is initially worth zero', () => {
    expect(betService.pot).toEqual(0)
  })

  it('should have a closeBets() fn that empties the currentBets and add its amount to pot ', () => {

  });
});
