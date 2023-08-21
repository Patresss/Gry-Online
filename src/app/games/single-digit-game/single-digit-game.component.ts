import {Component} from "@angular/core";

@Component({
    selector: 'app-single-digit-game',
    template: '<app-single-character-game [availableCharacters]="availableCharacters" [assetFolder]="assetFolder"/>'
})
export class SingleDigitGameComponent {

    availableCharacters: string = '1234567890';
    assetFolder: string = 'single-digit';

}
