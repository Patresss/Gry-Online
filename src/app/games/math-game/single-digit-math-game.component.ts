import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {GameDialogComponent} from "../../dialog/game-dialog/game-dialog.component";
import {MemoryService} from "../memory-game/memory.service";
import {ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {MathService} from "./math.service";
import {MathEquation} from "./math.model";

@Component({
  selector: 'app-single-digit-math-game',
  templateUrl: './single-digit-math-game.component.html',
  styleUrls: ['../game.component.css']
})
export class SingleDigitMathGameComponent implements OnInit, OnDestroy, OnChanges {

  constructor(private mathService: MathService,
              public dialog: MatDialog) {
    };

  availableMathEquations: MathEquation[] = this.mathService.generateAddTo9equationsList();
  currentMathEquation: MathEquation = this.getRandomMathEquation();

  hideCharacter: boolean = true;

  progressStep: number = 10;
  progress: number = 0;
  isTransitioning: boolean = false;
  keyListener = (event: KeyboardEvent) => this.handleKeyPress(event);


  ngOnInit(): void {
    document.addEventListener( 'keydown', this.keyListener);
    this.initGame();
  }

  initGame(): void {
    this.progress = 0;
    this.updateMathEquation();
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

  private getRandomMathEquation(): MathEquation {
    const randomIndex = Math.floor(Math.random() * this.availableMathEquations.length);
    return this.availableMathEquations[randomIndex];
  }

  private handleCorrect(): void {
    this.progress += this.progressStep;
    if (this.progress >= 100) {
      this.openDialog();
    } else {
      this.updateMathEquation();
    }
  }

  private updateMathEquation(): void {
    this.currentMathEquation = this.getRandomMathEquation();
    this.isTransitioning = false;
  }

  private handleKeyPress(event: KeyboardEvent): void {
    if (!this.isTransitioning) {
      const pressedKey = event.key.toUpperCase();
      const currentDigit = this.currentMathEquation.result.toString();
      const characterDisplay: HTMLDivElement = document.getElementById('character-display') as HTMLDivElement;

      if (pressedKey === currentDigit) {
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
