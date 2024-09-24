import {Injectable} from '@angular/core';
import {MemoryCard, MemoryType} from './memory.model';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {

  private images: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'R',
    'S',
    'T',
    'U',
    'W',
    'Y',
    'Z',
  ];

  generateCards(numberOfPairs: number, memoryType: MemoryType): MemoryCard[] {
    let cards: MemoryCard[] = [];

    this.shuffle(this.images)
      .slice(0, numberOfPairs)
      .forEach((name, index) => {
          let nameCard1 = memoryType == MemoryType.LOWER_CASE ? name.toLowerCase() : name.toUpperCase();
          let nameCard2 = memoryType == MemoryType.UPPER_CASE ? name.toUpperCase() : name.toLowerCase();
          let card1: MemoryCard = { id: index * 2, imageUrl: `assets/single-letter/images/${name}.jpg`, imageName: nameCard1, isFlipped: false, isHidden: false };
          let card2: MemoryCard = { id: index * 2 + 1, imageUrl: `assets/single-letter/images/${name}.jpg`, imageName: nameCard2, isFlipped: false, isHidden: false };
          cards.push(card1, card2);
    });

    return this.shuffle(cards);
  }

  private shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
