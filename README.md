[![Netlify Status](https://api.netlify.com/api/v1/badges/c1736a74-3058-4330-ba1b-0ff1f74ce8b0/deploy-status)](https://app.netlify.com/sites/poker-hands-compare/deploys)

<!-- PROJECT LOGO -->

<h1 align="center">Poker Hands TDD Kata ♠ ♥ ♦ ♣</h1>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/PierreTsia/tdd-poker#readme"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://poker-hands-compare.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/PierreTsia/tdd-poker/issues">Report Bug</a>
    ·
    <a href="https://github.com/PierreTsia/tdd-poker/issues">Request Feature</a>
  </p>

> “Tests are stories we tell the next generation of programmers on a project.” — Roy Osherove

> **🥋 Kata** _(noun)_ :
> a set combination of positions and movements (as in karate) performed as an exercise

## Summary 📃

Compare a pair of poker hands and indicate which, if either, has is the winning hand and why.

Use "strict" TDD discipline : every single line of production code must be justified by a failing test !

[See specs](#specs) for details.

## Difficulty Level 🥵

**⭐ Basic :** Analyze a Hand

- given a `str:string` variable (ex: `"2H 4S 4C 2D 4H"]`) as input, your `analyzeHand()` function
  should return `"Full House: 4H, 4C, 4S, 2D, 2H"`

**⭐⭐⭐ Medium :** Compare Hands:

- given two variables `hands:string[]`(ex: ` ["2H 4S 4C 2D 4H", "2S 8S AS QS 3S"]`) and `players:string[]` (ex:`['Alice', 'Bob']`)
  as input, your `compareHands()` function should return `"Alice wins. - with Full House: 4H, 4C, 4S, 2D, 2H"`

**⭐⭐⭐⭐⭐ Black-belt 🥋 :**

Deal and compare hands

- In addition to the above requirements, you should implement a dealing card logic:

  - all cards must come from a single deck - meaning that a single card must be unique
  - the cards must be shuffled before they are distributed
  - they must be distributed in the correct way : given players are `Alice` & `Bob`,
    Alice should receive the first card of the deck, Bob the second, Alice the third, etc...

## <a name="specs"></a>Specs 🧪

### Poker Rules

- A poker deck contains 52 cards - each card has a suit which is one of clubs, diamonds, hearts, or spades (denoted C,
  D, H, and S in the input data).
- Each card also has a value which is one of 2, 3, 4, 5, 6, 7, 8, 9, 10, jack, queen, king,
  ace (denoted 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K, A).

A poker hand consists of 5 cards dealt from the deck. Poker hands are ranked by the following partial order from
lowest to highest.

> ● **High Card:** Hands which do not fit any higher category are ranked by the value of their highest card. If the
> highest cards have the same value, the hands are ranked by the next highest, and so on.

> ● **Pair:** 2 of the 5 cards in the hand have the same value. Hands which both contain a pair are ranked by the
> value of the cards forming the pair. If these values are the same, the hands are ranked by the values of the
> cards not forming the pair, in decreasing order.

> ● **Two Pairs:** The hand contains 2 different pairs. Hands which both contain 2 pairs are ranked by the value of
> their highest pair. Hands with the same highest pair are ranked by the value of their other pair. If these values
> are the same the hands are ranked by the value of the remaining card.

> ● **Three of a Kind:** Three of the cards in the hand have the same value. Hands which both contain three of a
> kind are ranked by the value of the 3 cards.

> ● **Straight:** Hand contains 5 cards with consecutive values. Hands which both contain a straight are ranked by
> their highest card.

> ● **Flush:** Hand contains 5 cards of the same suit. Hands which are both flushes are ranked using the rules for
> High Card.

> ● **Full House:** 3 cards of the same value, with the remaining 2 cards forming a pair. Ranked by the value of the 3
> cards.

> ● **Four of a kind:** 4 cards with the same value. Ranked by the value of the 4 cards.

> ● **Straight flush:** 5 cards of the same suit with consecutive values. Ranked by the highest card in the hand

### Acceptance Tests

| Bob (Player 1) | John (Player 2) |                                          Output |
| -------------- | :-------------: | ----------------------------------------------: |
| 2H 3D 5S 9C KD | 2C 3H 4S 8C AH  |                 John wins. - with high card: AH |
| 2H 4S 4C 2D 4H | 2S 8S AS QS 3S  | Bob wins. - with full house: 4H, 4C, 4S, 2D, 2H |
| 2H 3D 5S 9C KD | 2C 3H 4S 8C KH  |                  Bob wins. - with high card: KD |
| 2H 3D 5S 9C KD | 2D 3H 5C 9S KH  |                                            Tie. |
