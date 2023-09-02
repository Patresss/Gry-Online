import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { MainPageComponent } from './main-page/main-page.component';
import {SingleCharacterGameComponent} from "./games/single-character-game/single-character-game.component";
import {SingleLetterGameComponent} from "./games/single-letter-game/single-letter-game.component";
import {SingleDigitGameComponent} from "./games/single-digit-game/single-digit-game.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatRippleModule} from "@angular/material/core";
import { GameProgressBarComponent } from './game-progress-bar/game-progress-bar.component';
import {NgOptimizedImage} from "@angular/common";
import { GameDialogComponent } from './game-dialog/game-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { MultiCharactersGameComponent } from './games/multi-characters-game/multi-characters-game.component';
import { MemoryGameComponent } from './games/memory-game/memory-game.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    data: {
      title: 'Gry Online'
    }
  },
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
  {
    path: 'wyrazy',
    component: MultiCharactersGameComponent,

    data: {
      title: 'Wyrazy'
    }
  },
  {
    path: 'memory',
    component: MemoryGameComponent,

    data: {
      title: 'Memory'
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
    GameProgressBarComponent,
    GameProgressBarComponent,
    GameDialogComponent,
    MultiCharactersGameComponent,
    MemoryGameComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserAnimationsModule,
    MatGridListModule,
    MatRippleModule,
    NgOptimizedImage,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
