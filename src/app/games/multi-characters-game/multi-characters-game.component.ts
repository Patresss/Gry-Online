import {Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {GameDialogComponent} from "../../game-dialog/game-dialog.component";

@Component({
  selector: 'app-multi-characters-game',
  templateUrl: './multi-characters-game.component.html',
  styleUrls: ['../game.component.css']
})
export class MultiCharactersGameComponent implements OnInit, OnDestroy, OnChanges {

  constructor(public dialog: MatDialog) {}

  assetFolder: string = 'words';

  progressStep: number = 20;
  progress: number = 0;
  imageSrc: string = '';
  isTransitioning: boolean = false;

  currentWord: string[] = [];
  availableWords: string[] = ['MAMA', 'TATA', 'WIKTOR', 'OLIWIA'];
  guessingCharacterIndex: number = 0;

  keyListener = (event: KeyboardEvent) => this.handleKeyPress(event);

  ngOnInit(): void {
    document.addEventListener( 'keydown', this.keyListener);
    this.initGame();
  }

  initGame(): void {
    this.progress = 0;
    this.updateWord();
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.keyListener);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["progress"] && changes["progress"].currentValue >= 100) {
      this.initGame();
      this.openDialog();
    }
  }

  private getRandomWord(): string[] {
    const currentWordAsString = this.currentWord.join('');
    const availableCharactersWithoutCurrent = this.availableWords
      .filter(word => {
        return currentWordAsString !== word;
      });
    const randomIndex = Math.floor(Math.random() * availableCharactersWithoutCurrent.length);
    return availableCharactersWithoutCurrent[randomIndex].split('');
  }

  private handleCorrectLetter(): void {
    this.playCharacter();

    this.guessingCharacterIndex++;
    if (this.guessingCharacterIndex >= this.currentWord.length) {
      this.handleCorrectWord();
    } else {
      this.updateCharacter();
    }
  }

  private handleCorrectWord(): void {
    if (this.progress >= 100) {
      this.openDialog();
    } else {
      setTimeout(() => {
        this.updateWord();
      }, 300);
    }
  }

  private updateCharacter(): void {
    this.isTransitioning = false;
  }

  private updateWord(): void {
    this.guessingCharacterIndex = 0;
    this.currentWord = this.getRandomWord();

    const currentWordAsString = this.currentWord.join('');

    this.playSound();
    this.imageSrc = `assets/${this.assetFolder}/images/${currentWordAsString}.jpg`;
    this.isTransitioning = false;
  }

  private handleKeyPress(event: KeyboardEvent): void {
    if (!this.isTransitioning) {
      const pressedKey = event.key.toUpperCase();
      const currentLetter = this.currentWord[this.guessingCharacterIndex];
      const characterDisplay: HTMLDivElement = document.getElementById('character-' + this.guessingCharacterIndex) as HTMLDivElement;

      if (pressedKey === currentLetter) {
        this.isTransitioning = true;
        characterDisplay.classList.remove("wrong");
        characterDisplay.classList.add("correct");
        setTimeout(() => {
          this.handleCorrectLetter();
          characterDisplay.classList.remove("correct");
        }, 300);
      } else {
        characterDisplay.classList.add("wrong");
        setTimeout(() => {
          characterDisplay.classList.remove("wrong");
        }, 300);
      }
    }
  }

  playSound(): void {
    const audio = new Audio(`assets/${this.assetFolder}/audio/${this.currentWord.join('')}.mp3`);
    audio.play();
  }

  playCharacter(): void {
    const audio = new Audio(`assets/letters/audio/${this.currentWord[this.guessingCharacterIndex]}.mp3`);
    audio.play();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GameDialogComponent, {
      width: '300px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
      data: {
        dialogTitle: 'Wygrałeś!'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initGame();
    });
  }

}
