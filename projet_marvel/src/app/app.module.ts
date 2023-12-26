import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { IntroComponent } from './intro/intro.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { LetterBarComponent } from './letter-bar/letter-bar.component';
import { SeriesComponent } from './series/series.component';
import { ComicsComponent } from './comics/comics.component';
import { AboutComponent } from './about/about.component';
import { CharactersByLetterComponent } from './characters-by-letter/characters-by-letter.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { ComicsDetailComponent } from './comics-detail/comics-detail.component';
import { ComicsListComponent } from './comics-list/comics-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    IntroComponent,
    CharactersComponent,
    CharacterDetailComponent,
    LetterBarComponent,
    SeriesComponent,
    ComicsComponent,
    AboutComponent,
    CharactersByLetterComponent,
    CharactersListComponent,
    SeriesListComponent,
    SeriesDetailComponent,
    ComicsDetailComponent,
    ComicsListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
