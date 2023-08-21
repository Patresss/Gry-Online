import {Component} from "@angular/core";

@Component({
    selector: 'app-single-letter-game',
    template: '<app-single-character-game [availableCharacters]="availableCharacters" [assetFolder]="assetFolder"/>'
})
export class SingleLetterGameComponent {

    availableCharacters: string = 'ABCDEFGHIJKLMNOPRSTUWYZ';
    assetFolder: string = 'single-letter';

}
