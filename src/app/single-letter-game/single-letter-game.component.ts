import {Component} from "@angular/core";

@Component({
    selector: 'app-single-letter',
    templateUrl: './single-letter-game.component.html'
})
export class SingleLetterGameComponent {

    availableCharacters: string = 'ABCDEFGHIJKLMNOPRSTUWYZ';
    assetFolder: string = 'single-letter';

}
