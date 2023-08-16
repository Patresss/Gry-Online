import {Component, Input, OnDestroy, OnInit} from "@angular/core";

@Component({
  selector: 'app-single-character-game',
  templateUrl: './single-character-game.component.html',
  styleUrls: ['./single-character-game.component.css']
})
export class SingleCharacterGameComponent implements OnInit, OnDestroy  {

  @Input() availableCharacters: string = '';
  @Input() assetFolder: string = '';

  currentCharacter: string = '';
  isTransitioning: boolean = false;
  keyListener = (event: KeyboardEvent) => this.handleKeyPress(event);

  ngOnInit(): void {
    this.initGame();
  }

  initGame(): void {
    this.updateCharacter();
    document.addEventListener( 'keydown', this.keyListener);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.keyListener);
  }

  private getRandomCharacter(): string {
    const availableCharactersWithoutCurrentCharacter = this.availableCharacters.replace(this.currentCharacter, '');
    const randomIndex = Math.floor(Math.random() * availableCharactersWithoutCurrentCharacter.length);
    return availableCharactersWithoutCurrentCharacter[randomIndex];
  }

  private updateCharacter(): void {
    this.currentCharacter = this.getRandomCharacter();
    const characterDisplay: HTMLDivElement = document.getElementById('character-display') as HTMLDivElement;
    characterDisplay.classList.remove("correct");

    this.playSound(this.currentCharacter);

    const letterImage: HTMLImageElement = document.getElementById('character-image') as HTMLImageElement;
    letterImage.src = `assets/${this.assetFolder}/images/${this.currentCharacter}.jpg`;
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
          this.updateCharacter();
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

}
