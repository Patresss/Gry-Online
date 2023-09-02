import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {GameDialogComponent} from "../../game-dialog/game-dialog.component";
import {WordDatabaseService} from "./word-database.service";
import {Word} from "./word.model";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-multi-characters-game',
    templateUrl: './multi-characters-game.component.html',
    styleUrls: ['../game.component.css']
})
export class MultiCharactersGameComponent implements OnInit, OnDestroy, OnChanges {

    constructor(public dialog: MatDialog, public wordDatabaseService: WordDatabaseService) {
    }

    assetFolder: string = 'words';

    progressStep: number = 20;
    progress: number = 0;
    imageSrc: string = '';
    isTransitioning: boolean = false;

    currentWord: string[] = [];
    words: Word[] = [];
    guessingCharacterIndex: number = 0;

    filesSelected: boolean = false; // flaga wskazująca, czy pliki zostały wybrane
    keyListener = (event: KeyboardEvent) => this.handleKeyPress(event);

    async ngOnInit(): Promise<void> {
        document.addEventListener('keydown', this.keyListener);
        this.words = await this.wordDatabaseService.loadFromDatabase();
        this.initGame();
    }

    async onFilesSelected(event: Event): Promise<void> {
        this.words = await this.wordDatabaseService.onFilesSelected(event);
        if (this.words.length > 0) {
            this.updateWord();
        }
    }

    private loadImage(word: string): void {
        if (this.words) {
            const file = Array.from(this.words)
                .map(f => f.file)
                .find(f => f.name.replace('.jpg', '').toUpperCase() === word.toUpperCase());
            if (file) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.imageSrc = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }
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
        if (this.words.length <= 1) {
            return this.words[0].name.split('');
        }

        const currentWordAsString = this.currentWord.join('');
        const availableCharactersWithoutCurrent = this.words
            .filter(word => currentWordAsString !== word.name);
        const randomIndex = Math.floor(Math.random() * availableCharactersWithoutCurrent.length);
        return availableCharactersWithoutCurrent[randomIndex].name.split('');
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
        this.progress += this.progressStep;
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

        this.loadImage(currentWordAsString);

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

    playCharacter(): void {
        const audio = new Audio(`assets/letters/audio/${this.currentWord[this.guessingCharacterIndex]}.mp3`);
        if (audio) {
            audio.play();
        }
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
