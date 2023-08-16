import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SingleLetterGameComponent } from './single-letter-game/single-letter-game.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
  {
    path: 'SingleLetterGame',
    component: SingleLetterGameComponent,
    data: {
      title: 'Literki na klawiaturze'
    }
  },
];

@NgModule({
  declarations: [
    AppComponent,
    SingleLetterGameComponent,
    ToolbarComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
