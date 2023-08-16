import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { MainPageComponent } from './main-page/main-page.component';
import {SingleCharacterGameComponent} from "./single-character-game/single-character-game.component";
import {SingleLetterGameComponent} from "./single-letter-game/single-letter-game.component";
import {SingleDigitGameComponent} from "./single-digit-game/single-digit-game.component";


const routes: Routes = [
  {
    path: 'pojedyncza-litera',
    component: SingleLetterGameComponent,

    data: {
      title: 'Literki na klawiaturze'
    }
  },
  {
    path: 'pojedyncza-cyfra',
    component: SingleDigitGameComponent,

    data: {
      title: 'Cyferki na klawiaturze'
    }
  },
];

@NgModule({
  declarations: [
    AppComponent,
    SingleCharacterGameComponent,
    SingleLetterGameComponent,
    SingleDigitGameComponent,
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
