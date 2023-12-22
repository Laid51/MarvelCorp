import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, of } from 'rxjs';
import { Character } from 'src/character.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    characters: any[] = []

    BASE_URL = 'https://gateway.marvel.com/v1/public/characters?apikey=7100c52016691ef1572e3ad00a397bdb&ts=1702042186&hash=2eea267d3ff770553ef0a6424a4f315c'

    /*constructor() {
        this.characters.push( { name: '3-D Man', description: '3d man Le super hero de fou', img: 'assets/3d_man.jpg'} )
        this.characters.push( { name: 'A-Bomb (HAS)', description: "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ", img: 'assets/A_bomb.jpg'} )
        this.characters.push( { name: 'A.I.M.', description: "AIM is a terrorist organization bent on destroying the world.", img: 'assets/A.I.M.jpg'} )
    }*/

    constructor(private http: HttpClient) { }

    /*getCharacters(): Observable<any[]> {
        return this.http.get(this.BASE_URL).pipe(
            map( (all:any) => all.data),
            map( (data:any) => this.obj2ArrayCharacter(data))
        )
    }*/
    getCharacters(): Observable<any[]> {
        return this.http.get<any>(this.BASE_URL).pipe(
          map(response => response.data.results),
          map(results => this.extractCharacterInfo(results))
        );
      }

    getCharacterById(id: string): Observable<Character> {
        return this.http.get(this.BASE_URL + '/lookup.php?i=' + id).pipe(
            filter( (data: any) => data.drinks != null),
            map( (data: any) => ({
                id: data.drinks[0].id,
                name: data.drinks[0].name,
                description: data.drinks[0].description,
                img: (data.drinks[0].thumbnail+data.drinks[0].extension)
            }) )
        )
    }

    getCharacterFirstLetter(letter: string): Observable<any[]> {
        return of(this.characters.filter( el => el.name.toLocaleLowerCase()[0] === letter.toLocaleLowerCase() ))
    }

    getCharactersContains(search: string): Observable<Character[]> {
        return this.getCharacters().pipe(
            map( (cocktails: Character[]) => cocktails.filter( (el: Character) => el.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) >= 0 ))
        )
    }

    getCharactersFirstLetter(letter: string): Observable<Character[]> {
        return this.getCharacters().pipe(
            map( (cocktails: Character[]) => cocktails.filter( (el: Character) => el.name.toLocaleLowerCase()[0] === letter.toLocaleLowerCase() ) )
        )
    }

    getCharactersBeginWith(begin: string): Observable<Character[]> {
        return this.getCharacters().pipe(
            map( (cocktails: Character[]) => cocktails.filter( (el: Character) => el.name.toLocaleLowerCase().indexOf(begin.toLocaleLowerCase()) === 0 ) )
        )
    }

    protected extractCharacterInfo(results: any[]): Character[] {
        return results.map((character:any):Character => 
            ({
          id: character.id,
          name: character.name,
          description: character.description,
          img: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        }));
      }
}
