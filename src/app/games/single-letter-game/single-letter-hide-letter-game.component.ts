import {Component} from "@angular/core";

@Component({
    selector: 'app-single-without=letter-game',
    template: '<app-single-character-game [availableCharacters]="availableCharacters" [assetFolder]="assetFolder" [hideCharacter]="true"/>'
})
export class SingleLetterHideLetterGameComponent {

    availableCharacters: string = 'ABCDEFGHIJKLMNOPRSTUWYZ';
    assetFolder: string = 'single-letter';

}
