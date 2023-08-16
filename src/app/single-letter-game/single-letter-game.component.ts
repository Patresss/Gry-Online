import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-single-letter-game',
  templateUrl: './single-letter-game.component.html',
  styleUrls: ['./single-letter-game.component.css']
})
export class SingleLetterGameComponent implements OnInit {
  currentCharacter: string = 'A';
  isTransitioning: boolean = false;

  ngOnInit(): void {
    this.updateCharacter();
    document.addEventListener( 'keydown', (event) => this.handleKeyPress(event));
  }

  getRandomCharacter(): string {
    const alphabet = 'ABCDEFGHIJKLMNOPRSTUWYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  }

  updateCharacter(): void {
    this.currentCharacter = this.getRandomCharacter();
    const characterDisplay: HTMLDivElement = document.getElementById('character-display') as HTMLDivElement;
    characterDisplay.classList.remove("correct");

    this.playSound(this.currentCharacter);

    const letterImage: HTMLImageElement = document.getElementById('character-image') as HTMLImageElement;
    letterImage.src = `assets/images/${this.currentCharacter}.jpg`;
    this.isTransitioning = false;
  }

  handleKeyPress(event: KeyboardEvent): void {
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

  playSound(letter: string): void {
    const audio = new Audio(`assets/audio/${letter}.mp3`);
    audio.play();
  }

  onLetterClick(): void {
    this.updateCharacter();
  }

}
