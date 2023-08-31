import { Component, OnInit } from '@angular/core';
import {MemoryService} from "./memory.service";
import {MemoryCard} from "./memory.model";
import {MatDialog} from "@angular/material/dialog";
import {GameDialogComponent} from "../../game-dialog/game-dialog.component";

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {
  cards: MemoryCard[] = [];
  rowCards: MemoryCard[][] = [];
  flippedCards: MemoryCard[] = [];

  constructor(private memoryService: MemoryService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.resetGame();
  }

  flipCard(card: MemoryCard): void {
    if (this.flippedCards.length < 2 && !card.isFlipped && !card.isHidden) {
      card.isFlipped = true;
      this.flippedCards.push(card);
      if (this.flippedCards.length === 2) {
        setTimeout(() => this.checkMatch(), 1000);
      }
    }
  }

  private checkMatch(): void {
    const [card1, card2] = this.flippedCards;
    if (card1.imageUrl === card2.imageUrl) {
        card1.isHidden = true;
        card2.isHidden = true;
        this.flippedCards = [];
        this.checkWin();
    } else {
      card1.isFlipped = false;
      card2.isFlipped = false;
      this.flippedCards = [];
    }
  }

  private checkWin(): void {
    if (this.cards.every(card => card.isHidden)) {
      this.openDialog();
      setTimeout(() => this.resetGame(), 3000);
    }
  }

  private resetGame(): void {
    this.rowCards = [];
    this.cards = this.memoryService.generateCards();

    for (let i = 0; i < this.cards.length; i += 4) {
      this.rowCards.push(this.cards.slice(i, i + 4));
    }
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(GameDialogComponent, {
      width: '300px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
      data: {
        dialogTitle: 'Wygrałeś!'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.resetGame();
    });
  }

}
