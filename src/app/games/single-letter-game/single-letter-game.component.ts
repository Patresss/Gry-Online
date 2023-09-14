import {Component} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {WordDatabaseService} from "../multi-characters-game/word-database.service";
import {ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
    selector: 'app-single-letter-game',
    template: '<app-single-character-game [availableCharacters]="availableCharacters" [assetFolder]="assetFolder" [hideCharacter]="hideCharacter" [lowerCase]="lowerCase"/>'
})
export class SingleLetterGameComponent {

    availableCharacters: string = 'ABCDEFGHIJKLMNOPRSTUWYZ';
    assetFolder: string = 'single-letter';
    lowerCase: boolean = false;
    hideCharacter: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let currentRoute = this.router.routerState.snapshot.root;
      while (currentRoute) {
        if (currentRoute.data && currentRoute.data['lowerCase']) {
          this.lowerCase = currentRoute.data['lowerCase'];
          break;
        }
        if (currentRoute.data && currentRoute.data['hideCharacter']) {
          this.hideCharacter = currentRoute.data['hideCharacter'];
          break;
        }
        currentRoute = currentRoute.firstChild as ActivatedRouteSnapshot;
      }
    });
  }

}
