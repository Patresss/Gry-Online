import {Component} from "@angular/core";

@Component({
    selector: 'app-single-digit-game',
    template: '<app-single-character-game [availableCharacters]="availableCharacters" [assetFolder]="assetFolder" [hideCharacter]="true"/>'
})
export class SingleDigitHideDigitGameComponent {

    availableCharacters: string = '1234567890';
    assetFolder: string = 'single-digit';

}
