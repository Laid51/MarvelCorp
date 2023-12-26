import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/character.interface';
import { DataService } from '../data.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-characters-by-letter',
  templateUrl: './characters-by-letter.component.html',
  styleUrls: ['./characters-by-letter.component.css']
})
export class CharactersByLetterComponent {
  characters: Character[] = []

    constructor(
        private activatedRoute: ActivatedRoute,
        private dataService: DataService)
    { }

    ngOnInit(): void {
      for (let i=0; i<16; i++){
        this.activatedRoute.paramMap.pipe(
            map( params => params.get('letter') ?? '' ),
            switchMap( (letter: string) => this.dataService.getCharactersFirstLetter(letter, i*100) )
        ).subscribe(
          characters => this.characters.push(...characters)
        )
      }
    }


}
