import { BodyComponent } from './body/body.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { SeriesComponent } from './series/series.component';
import { ComicsComponent } from './comics/comics.component';
import { AboutComponent } from './about/about.component';
import { CharactersByLetterComponent } from './characters-by-letter/characters-by-letter.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: BodyComponent },
    { path: 'characters/:letter', component: CharactersByLetterComponent },
    { path: 'series', component: SeriesComponent },
    { path: 'comics', component: ComicsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'characters/:id/detail', component: CharacterDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
