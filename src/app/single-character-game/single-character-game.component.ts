import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {GameDialogComponent} from "../game-dialog/game-dialog.component";

@Component({
  selector: 'app-single-character-game',
  templateUrl: './single-character-game.component.html',
  styleUrls: ['./single-character-game.component.css']
})
export class SingleCharacterGameComponent implements OnInit, OnDestroy, OnChanges {

  constructor(public dialog: MatDialog) {}

  @Input() availableCharacters: string = '';
  @Input() assetFolder: string = '';

  progressStep: number = 10;
  progress: number = 0;
  currentCharacter: string = '';
  imageSrc: string = '';
  isTransitioning: boolean = false;
  keyListener = (event: KeyboardEvent) => this.handleKeyPress(event);

  ngOnInit(): void {
    document.addEventListener( 'keydown', this.keyListener);
    this.initGame();
  }

  initGame(): void {
    this.progress = 0;
    this.updateCharacter();
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.keyListener);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("test")
    console.log(changes["progress"])
    if (changes["progress"] && changes["progress"].currentValue >= 100) {
      this.initGame();
      this.openDialog();
    }
  }

  private getRandomCharacter(): string {
    const availableCharactersWithoutCurrentCharacter = this.availableCharacters.replace(this.currentCharacter, '');
    const randomIndex = Math.floor(Math.random() * availableCharactersWithoutCurrentCharacter.length);
    return availableCharactersWithoutCurrentCharacter[randomIndex];
  }

  private handleCorrect(): void {
    this.progress += this.progressStep;
    if (this.progress >= 100) {
      this.openDialog();
    } else {
      this.updateCharacter();
    }
  }

  private updateCharacter(): void {
    this.currentCharacter = this.getRandomCharacter();
    const characterDisplay: HTMLDivElement = document.getElementById('character-display') as HTMLDivElement;
    characterDisplay.classList.remove("correct");

    this.playSound(this.currentCharacter);

    this.imageSrc = `assets/${this.assetFolder}/images/${this.currentCharacter}.jpg`;
    this.isTransitioning = false;
  }

  private handleKeyPress(event: KeyboardEvent): void {
    if (!this.isTransitioning) {
      const pressedKey = event.key.toUpperCase();
      const currentLetter = this.currentCharacter;
      const characterDisplay: HTMLDivElement = document.getElementById('character-display') as HTMLDivElement;

      if (pressedKey === currentLetter) {
        this.isTransitioning = true;
        characterDisplay.classList.remove("wrong");
        characterDisplay.classList.add("correct");
        setTimeout(() => {
          this.handleCorrect();
        }, 500);
      } else {
        characterDisplay.classList.add("wrong");
        setTimeout(() => {
          characterDisplay.classList.remove("wrong");
        }, 500);
      }
    }
  }

  private playSound(letter: string): void {
    const audio = new Audio(`assets/${this.assetFolder}/audio/${letter}.mp3`);
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
