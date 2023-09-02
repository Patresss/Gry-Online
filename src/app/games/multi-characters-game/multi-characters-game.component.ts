import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {GameDialogComponent} from "../../game-dialog/game-dialog.component";
import {WordDatabaseService} from "./word-database.service";
import {Word} from "./word.model";

@Component({
    selector: 'app-multi-characters-game',
    templateUrl: './multi-characters-game.component.html',
    styleUrls: ['../game.component.css']
})
export class MultiCharactersGameComponent implements OnInit, OnDestroy, OnChanges {

    constructor(public dialog: MatDialog, public wordDatabaseService: WordDatabaseService) {
    }

    progressStep: number = 20;
    progress: number = 0;
    imageSrc: string = '';
    isTransitioning: boolean = false;

    currentWord: Word = {name: ''};

    words: Word[] = [];
    guessingCharacterIndex: number = 0;

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

    private loadImage(word: Word): void {
        if (this.words) {
            if (word.file) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.imageSrc = e.target.result;
                }
                reader.readAsDataURL(word.file);
            } else if (word.assetSource) {
                this.imageSrc = word.assetSource;
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

    async restoreToDefault() {
        this.words = await this.wordDatabaseService.clear();
        this.updateWord();
    }

    private getRandomWord(): Word {
        if (this.words.length <= 1) {
            return this.words[0];
        }

        const availableWordsWithoutCurrent = this.words
            .filter(word => word !== this.currentWord);
        const randomIndex = Math.floor(Math.random() * availableWordsWithoutCurrent.length);
        return availableWordsWithoutCurrent[randomIndex];
    }

    private handleCorrectLetter(): void {
        this.playCharacter();

        this.guessingCharacterIndex++;
        if (this.guessingCharacterIndex >= this.currentWord.name.length) {
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


        this.loadImage(this.currentWord);

        this.isTransitioning = false;
    }

    private handleKeyPress(event: KeyboardEvent): void {
        if (!this.isTransitioning) {
            const pressedKey = event.key.toUpperCase();
            const currentLetter = this.currentWord.name[this.guessingCharacterIndex];
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
        const audio = new Audio(`assets/letters/audio/${this.currentWord.name[this.guessingCharacterIndex]}.mp3`);
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
