export function greeter() {
  return {
    helloWorld: function () {
      return 'Hello, World!';
    },
    helloPerson: function (name: string) {
      return `Hello ${name}!`;
    },
  };
}

// class CardDeck {
//   private deck: string[] = ['Available'];
//   constructor() {
//     this.deck = [];
//   }

//   getDeck() {
//     return this.deck;
//   }

//   getCardAt(index: number) {
//     const cardSuits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
//     const values = [
//       'A',
//       '2',
//       '3',
//       '4',
//       '5',
//       '6',
//       '7',
//       '8',
//       '9',
//       '10',
//       'J',
//       'Q',
//       'K',
//     ];
//     let cardSuit = cardSuits[index / 13];
//     let cardNumber = values[index % 13];
//     return `${cardNumber} of ${cardSuit}`;
//   }

//   createDeck() {}
// }

// class Game {
//   private decks: number;
//   private cardStatus: string[];
//   private cardNumbers: number[];

//   issueCard(index: number) {
//     this.cardStatus[index] = 'Issued';
//   }

//   constructor(deckCount: number) {
//     this.decks = deckCount;
//     this.cardNumbers = Array.from({ length: this.decks * 52 }, (_, i) => i + 1);
//     this.cardStatus = new Array(this.decks * 52).fill('Available');
//   }

//   shuffleDecks() {
//     this.cardNumbers;
//   }
// }
