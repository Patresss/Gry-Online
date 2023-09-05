import {Component} from "@angular/core";

@Component({
    selector: 'app-single-small-letter-game',
    template: '<app-single-character-game [availableCharacters]="availableCharacters" [assetFolder]="assetFolder" [lowerCase]="true"/>'
})
export class SingleSmallLetterGameComponent {

    availableCharacters: string = 'ABCDEFGHIJKLMNOPRSTUWYZ';
    assetFolder: string = 'single-letter';

}
