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
import {SingleDigitHideDigitGameComponent} from "./games/single-digit-game/single-digit-hide-digit-game.component";
import {ToolbarComponent} from "./component/toolbar/toolbar.component";
import {GameProgressBarComponent} from "./component/game-progress-bar/game-progress-bar.component";
import {GameDialogComponent} from "./dialog/game-dialog/game-dialog.component";
import {InfoDialogComponent} from "./dialog/info-dialog/info-dialog.component";
import {SingleDigitMathAddingGameComponent} from "./games/math-game/single-digit-math-adding-game.component";
import {SingleDigitMathGameComponent} from "./games/math-game/single-digit-math-game.component";
import {SingleDigitMathSubtractionGameComponent} from "./games/math-game/single-digit-math-subtraction-game.component";
import {MemoryType} from "./games/memory-game/memory.model";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    data: {
      title: 'Edukacyjne Gry Online'
    }
  },
  {
    path: 'litery-na-klawiaturze',
    component: SingleLetterGameComponent,

    data: {
      title: 'Litery na klawiaturze'
    }
  },
  {
    path: 'male-litery-na-klawiaturze',
    component: SingleLetterGameComponent,
    data: {
      title: 'Małe litery na klawiaturze',
      lowerCase: true
    }
  },
  {
    path: 'litery-na-klawiaturze-z-samym-obrazkiem',
    component: SingleLetterGameComponent,

    data: {
      title: 'Litery na klawiaturze z samym obrazkiem',
      hideCharacter: true
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
    path: 'dodawanie-do-9',
    component: SingleDigitMathAddingGameComponent,

    data: {
      title: 'Dodawanie do 9'
    }
  },
  {
    path: 'odejmowanie-do-9',
    component: SingleDigitMathSubtractionGameComponent,

    data: {
      title: 'Odejmowanie do 9'
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
      memoryType: MemoryType.LOWER_CASE
    }
  },

  {
    path: 'memory-duze-male-litery',
    component: MemoryGameComponent,
    data: {
      title: 'Memory',
      memoryType: MemoryType.MIX_CASE
    }
  },
];

@NgModule({
  declarations: [
    AppComponent,
    SingleCharacterGameComponent,
    SingleLetterGameComponent,
    SingleDigitGameComponent,
    SingleDigitHideDigitGameComponent,
    ToolbarComponent,
    MainPageComponent,
    GameProgressBarComponent,
    GameDialogComponent,
    InfoDialogComponent,
    MultiCharactersGameComponent,
    MemoryGameComponent,
    SingleDigitMathAddingGameComponent,
    SingleDigitMathSubtractionGameComponent,
    SingleDigitMathGameComponent,
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
