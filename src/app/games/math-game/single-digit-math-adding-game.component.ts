import {Component} from "@angular/core";
import {MathService} from "./math.service";
import {MathEquation} from "./math.model";


@Component({
  selector: 'app-single-digit-math-adding-game',
  template: '<app-single-digit-math-game [availableMathEquations]="availableMathEquations"/>'
})
export class SingleDigitMathAddingGameComponent {

  availableMathEquations: MathEquation[] = this.mathService.generateAddTo9equationsList();

  constructor(private mathService: MathService) {
  }

}

