import { Injectable } from '@angular/core';
import { MathEquation } from './math.model';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  generateAddTo9equationsList(): MathEquation[] {
    const equations: MathEquation[] = [];
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        const result = i + j;
        if (result <= 9) {
          let mathEquation : MathEquation = {equation:  `${i} + ${j}`, result: result };
          equations.push(mathEquation);
        }
      }
    }
    return equations;
  }

  private shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
