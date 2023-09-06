import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { MainPageComponent } from './main-page/main-page.component';
import {SingleCharacterGameComponent} from "./games/single-character-game/single-character-game.component";
import {SingleLetterGameComponent} from "./games/single-letter-game/single-letter-game.component";
import {SingleDigitGameComponent} from "./games/single-digit-game/single-digit-game.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatRippleModule} from "@angular/material/core";
import {NgOptimizedImage} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { MultiCharactersGameComponent } from './games/multi-characters-game/multi-characters-game.component';
import { MemoryGameComponent } from './games/memory-game/memory-game.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SingleSmallLetterGameComponent} from "./games/single-letter-game/single-small-letter-game.component";
import {SingleLetterHideLetterGameComponent} from "./games/single-letter-game/single-letter-hide-letter-game.component";
import {SingleDigitHideDigitGameComponent} from "./games/single-digit-game/single-digit-hide-digit-game.component";
import {ToolbarComponent} from "./component/toolbar/toolbar.component";
import {GameProgressBarComponent} from "./component/game-progress-bar/game-progress-bar.component";
import {GameDialogComponent} from "./dialog/game-dialog/game-dialog.component";
import {InfoDialogComponent} from "./dialog/info-dialog/info-dialog.component";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    data: {
      title: 'Gry Online'
    }
  },
  {
    path: 'literki-na-klawiaturze',
    component: SingleLetterGameComponent,

    data: {
      title: 'Literki na klawiaturze'
    }
  },
  {
    path: 'male-literki-na-klawiaturze',
    component: SingleSmallLetterGameComponent,
    data: {
      title: 'Małe literki na klawiaturze'
    }
  },
  {
    path: 'literki-na-klawiaturze-z-samym-obrazkiem',
    component: SingleLetterHideLetterGameComponent,

    data: {
      title: 'Literki na klawiaturze z samym obrazkiem'
    }
  },
  {
    path: 'cyfry-na-klawiaturze',
    component: SingleDigitGameComponent,

    data: {
      title: 'Cyfry na klawiaturze'
    }
  },
  {
    path: 'cyfry-na-klawiaturze-z-samym-obrazkiem',
    component: SingleDigitHideDigitGameComponent,

    data: {
      title: 'Cyfry na klawiaturze z samym obrazkiem'
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
    path: 'wyrazy-male-litery',
    component: MultiCharactersGameComponent,
    data: {
      title: 'Wyrazy - małe litery',
      lowerCase: true
    }
  },
  {
    path: 'memory',
    component: MemoryGameComponent,
    data: {
      title: 'Memory'
    }
  },

  {
    path: 'memory-male-litery',
    component: MemoryGameComponent,
    data: {
      title: 'Memory',
      lowerCase: true

    }
  },
];

@NgModule({
  declarations: [
    AppComponent,
    SingleCharacterGameComponent,
    SingleLetterGameComponent,
    SingleSmallLetterGameComponent,
    SingleLetterHideLetterGameComponent,
    SingleDigitGameComponent,
    SingleDigitHideDigitGameComponent,
    ToolbarComponent,
    MainPageComponent,
    GameProgressBarComponent,
    GameDialogComponent,
    InfoDialogComponent,
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
