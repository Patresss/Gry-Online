import {Component, Input, OnInit} from '@angular/core';
import {MemoryService} from "./memory.service";
import {MEMORY_LEVELS, MemoryCard, MemoryLevel, MemoryType} from "./memory.model";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {GameDialogComponent} from "../../dialog/game-dialog/game-dialog.component";

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {
  cards: MemoryCard[] = [];
  rowCards: MemoryCard[][] = [];
  flippedCards: MemoryCard[] = [];

  currentLevel: MemoryLevel = MEMORY_LEVELS[0];
  progress: number = 0;
  progressStep: number = 100.0 / MEMORY_LEVELS.length;
  @Input() memoryType: MemoryType = MemoryType.UPPER_CASE;

  constructor(private memoryService: MemoryService,
              public dialog: MatDialog, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let currentRoute = this.router.routerState.snapshot.root;
      while (currentRoute) {
        if (currentRoute.data && currentRoute.data['memoryType']) {
          this.memoryType = currentRoute.data['memoryType'];
          break;
        }
        currentRoute = currentRoute.firstChild as ActivatedRouteSnapshot;
      }
    });
  }

  ngOnInit(): void {
    this.resetGame();
  }

  flipCard(card: MemoryCard): void {
    if (this.flippedCards.length < 2 && !card.isFlipped && !card.isHidden) {
      this.playCharacter(card.imageName);
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
        this.checkLevelWin();
    } else {
      card1.isFlipped = false;
      card2.isFlipped = false;
      this.flippedCards = [];
    }
  }

  private checkLevelWin(): void {
    if (this.areAllCardsHidden()) {
      this.loadNewLevel();
    }
  }

  private areAllCardsHidden() {
    return this.cards.every(card => card.isHidden);
  }

  private resetGame(): void {
    this.progress = 0;
    this.currentLevel = MEMORY_LEVELS[0];
    this.loadLevel();
  }

  private loadNewLevel(): void {
    const currentIndexMemoryLevel = MEMORY_LEVELS.indexOf(this.currentLevel);
    const nextIndexMemoryLevel = currentIndexMemoryLevel + 1;
    this.progress += this.progressStep;

    if (nextIndexMemoryLevel > MEMORY_LEVELS.length - 1) {
      this.openWinDialog();
    } else {
      this.currentLevel = MEMORY_LEVELS[nextIndexMemoryLevel];
      this.loadLevel();
    }
  }

  private loadLevel(): void {
    this.rowCards = [];
    this.cards = this.memoryService.generateCards(this.currentLevel.numberOfPairs, this.memoryType);

    for (let i = 0; i < this.cards.length; i += this.currentLevel.cardsInRow) {
      this.rowCards.push(this.cards.slice(i, i + this.currentLevel.cardsInRow));
    }
  }

  private openWinDialog(): void {
    const dialogRef = this.dialog.open(GameDialogComponent, {
      width: '300px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
      data: {
        dialogTitle: 'Wygrałeś!'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.areAllCardsHidden()) { // user
        this.resetGame();
      }
    });
  }

  playCharacter(cardName: string): void {
    const audio = new Audio(`assets/letters/audio/${cardName.toUpperCase()}.mp3`);
    audio.play();
  }

}
