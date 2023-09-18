import {Component} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {InfoDialogComponent} from "../../dialog/info-dialog/info-dialog.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  pageTitle: string = 'Edukacyjne Gry Online';

  constructor(private router: Router, public dialog: MatDialog) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updatePageTitle();
    });
  }

  private updatePageTitle() {
    let currentRoute = this.router.routerState.snapshot.root;
    let title = 'Edukacyjne Gry Online';

    while (currentRoute) {
      if (currentRoute.data && currentRoute.data['title']) {
        title = currentRoute.data['title'];
        break;
      }
      currentRoute = currentRoute.firstChild as ActivatedRouteSnapshot;
    }

    this.pageTitle = title;
  }

  openInfo() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '300px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
      data: {
        dialogTitle: 'Informacje!'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
