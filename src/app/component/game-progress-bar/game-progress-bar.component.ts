import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-game-progress-bar',
  templateUrl: './game-progress-bar.component.html',
  styleUrls: ['./game-progress-bar.component.css'],
  animations: [
    trigger('characterAnimation', [
      transition('* => *', [
        style({ left: '{{initialLeft}}%' }),
        animate('{{animationDuration}}ms', style({ left: '{{progress}}%' })),
      ]),
    ]),
  ],
})
export class GameProgressBarComponent implements OnInit, OnChanges {
  @Input() progress: number = 0;
  animationDuration: number = 500; // Czas trwania animacji (ms)
  initialLeft: number = 0;
  initialWidth: number = 0;

  ngOnInit() {
    this.initialLeft = this.progress;
    this.initialWidth = this.progress;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['progress']) {
      const previousProgress = changes['progress'].previousValue || 0;
      const newProgress = changes['progress'].currentValue || 0;
      this.initialLeft = previousProgress;
      this.initialWidth = previousProgress;

      if (newProgress > 100) {
        this.progress = 100;
      }
    }
  }

}
