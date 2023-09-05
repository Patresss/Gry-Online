import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {GameDialogComponent} from "../../game-dialog/game-dialog.component";

@Component({
  selector: 'app-single-character-game',
  templateUrl: './single-character-game.component.html',
  styleUrls: ['../game.component.css']
})
export class SingleCharacterGameComponent implements OnInit, OnDestroy, OnChanges {

  constructor(public dialog: MatDialog) {}

  @Input() availableCharacters: string = '';
  @Input() assetFolder: string = '';
  @Input() charactersColspan: number = 2;
  @Input() lowerCase: boolean = false;
  @Input() hideCharacter: boolean = false;

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
    if (changes["progress"] && changes["progress"].currentValue >= 100) {
      this.initGame();
      this.openDialog();
    }
  }

  private getRandomCharacter(): string {
    const availableCharactersWithoutCurrentCharacter = this.availableCharacters.replace(this.currentCharacter, '');
    const randomIndex = Math.floor(Math.random() * availableCharactersWithoutCurrentCharacter.length);
    const randomCharacter = availableCharactersWithoutCurrentCharacter[randomIndex];
    return this.lowerCase ? randomCharacter.toLowerCase() : randomCharacter.toUpperCase();
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
    this.playSound();
    this.imageSrc = `assets/${this.assetFolder}/images/${this.currentCharacter.toUpperCase()}.jpg`;
    this.isTransitioning = false;
  }

  private handleKeyPress(event: KeyboardEvent): void {
    if (!this.isTransitioning) {
      const pressedKey = event.key.toUpperCase();
      const currentLetter = this.currentCharacter;
      const characterDisplay: HTMLDivElement = document.getElementById('character-display') as HTMLDivElement;

      if (pressedKey === currentLetter.toUpperCase()) {
        this.isTransitioning = true;
        characterDisplay.classList.remove("wrong");
        characterDisplay.classList.add("correct");
        setTimeout(() => {
          characterDisplay.classList.remove("correct");
          setTimeout(() => {
            this.handleCorrect();
          }, this.hideCharacter ? 500 : 0);
        }, 500);
      } else {
        characterDisplay.classList.add("wrong");
        setTimeout(() => {
          characterDisplay.classList.remove("wrong");
        }, 500);
      }
    }
  }

  public playSound(): void {
    const audio = new Audio(`assets/${this.assetFolder}/audio/${this.currentCharacter.toUpperCase()}.mp3`);
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
