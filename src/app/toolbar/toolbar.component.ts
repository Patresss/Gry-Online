import {Component} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  pageTitle: string = 'Gry Online 1.11';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updatePageTitle();
    });
  }

  private updatePageTitle() {
    let currentRoute = this.router.routerState.snapshot.root;
    let title = 'Gry Online  1.11';

    while (currentRoute) {
      if (currentRoute.data && currentRoute.data['title']) {
        title = currentRoute.data['title'];
        break;
      }
      currentRoute = currentRoute.firstChild as ActivatedRouteSnapshot;
    }

    this.pageTitle = title;
  }
}
