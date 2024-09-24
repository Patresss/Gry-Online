import {Component} from "@angular/core";
import {MathService} from "./math.service";
import {MathEquation} from "./math.model";


@Component({
  selector: 'app-single-digit-math-adding-game',
  template: '<app-single-digit-math-game [availableMathEquations]="availableMathEquations"/>'
})
export class SingleDigitMathSubtractionGameComponent {

  availableMathEquations: MathEquation[] = this.mathService.generateSubtractionTo9equationsList();

  constructor(private mathService: MathService) {
  }

}

