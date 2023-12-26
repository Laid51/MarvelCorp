import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, combineLatest, filter, forkJoin, map, of, concatMap} from 'rxjs';
import { Character } from 'src/character.interface';
import { Comics } from 'src/comics.interface';
import { Series } from 'src/series.interface';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    characters: any[] = []

    BASE_URL_COMICS = "https://gateway.marvel.com/v1/public/comics"
    BASE_URL_SERIES = "https://gateway.marvel.com/v1/public/series"
    BASE_URL = 'https://gateway.marvel.com/v1/public/characters'
    LIMIT = 100
    LIMIT2 = "limit=100"
    OFFSET_NUM = 0
    OFFSET = "&offset=$" + this.OFFSET_NUM
    API_KEY = "&apikey=7100c52016691ef1572e3ad00a397bdb&ts=1702042186&hash=2eea267d3ff770553ef0a6424a4f315c"
   

    constructor(private http: HttpClient) { }


    /*getCharacters(): Observable<Character[]> {
            return  this.http.get<any>(this.BASE_URL + "?" + this.LIMIT2 + this.OFFSET + this.API_KEY).
                pipe(
                    map(response => response.data.results),
                    map(results => this.extractCharacterInfo(results))

                );
    }*/

    ////////////////////////


    getComics(offset: number): Observable<Comics[]> {
      const requestUrl = `${this.BASE_URL_COMICS}?${this.API_KEY}`;
  
      return this.http.get<any>(requestUrl).pipe(
        map(response => response.data.results),
        map(results => this.extractComicsInfo(results))
      );
    }

    getSeries(offset: number): Observable<Series[]> {
      const requestUrl = `${this.BASE_URL_SERIES}?${this.API_KEY}`;
  
      return this.http.get<any>(requestUrl).pipe(
        map(response => response.data.results),
        map(results => this.extractSeriesInfo(results))
      );
    }



    getCharacters(offset: number): Observable<Character[]> {
        const requestUrl = `${this.BASE_URL}?limit=${this.LIMIT}&offset=${offset}${this.API_KEY}`;
    
        return this.http.get<any>(requestUrl).pipe(
          map(response => response.data.results),
          map(results => this.extractCharacterInfo(results))
        );
      }

      

    getCharacterById(id: string): Observable<Character> {
        return this.http.get(this.BASE_URL + "/" + id + "?" + this.LIMIT2 + this.OFFSET + this.API_KEY).pipe(
            filter((data: any) => data.data.results != null),
            map((data: any) => ({
                id: data.data.results[0].id,
                name: data.data.results[0].name,
                description: data.data.results[0].description,
                img: data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension
            }))
        )
    }



    getSeriesById(id: string): Observable<Series> {
      return this.http.get(this.BASE_URL_SERIES + "/" + id + "?"+this.API_KEY).pipe(
          filter((data: any) => data.data.results != null),
          map((data: any) => ({
              id: data.data.results[0].id,
              title: data.data.results[0].title,
              description: data.data.results[0].description,
              img: data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension
          }))
      )
  }

  getComicsById(id: string): Observable<Comics> {
    return this.http.get(this.BASE_URL_COMICS + "/" + id + "?"+this.API_KEY).pipe(
        filter((data: any) => data.data.results != null),
        map((data: any) => ({
            id: data.data.results[0].id,
            title: data.data.results[0].title,
            description: data.data.results[0].description,
            img: data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension
        }))
    )
}

    /*getCharacterFirstLetter(letter: string): Observable<any[]> {
        return this.http.get<any>(this.BASE_URL + "?" + this.LIMIT2 + this.OFFSET + this.API_KEY).pipe(
            map(response => response.data.results),
            map(results => this.extractCharacterInfo(results)),
            map(match => match.filter(el => el.name.toLocaleLowerCase()[0] === letter.toLocaleLowerCase())),
        );
    }

    getCharactersContains(search: string,offset: number): Observable<Character[]> {
        return this.getCharacters(offset).pipe(
            map((characters: Character[]) => characters.filter((el: Character) => el.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) >= 0))
        )
    }

    getCharactersFirstLetter(letter: string,offset: number): Observable<Character[]> {
        return this.getCharacters(offset).pipe(
            map((characters: Character[]) => characters.filter((el: Character) => el.name.toLocaleLowerCase()[0] === letter.toLocaleLowerCase()))
        )
    }

    getCharactersBeginWith(begin: string,offset: number): Observable<Character[]> {
        return this.getCharacters(offset).pipe(
            map((characters: Character[]) => characters.filter((el: Character) => el.name.toLocaleLowerCase().indexOf(begin.toLocaleLowerCase()) === 0))
        )
    }*/
    
    
    /*getCharactersContains(search: string, offset: number): Observable<Character[]> {
        return this.getCharacters(offset).pipe(
          map((characters: Character[]) =>
            characters.filter((el: Character) => el.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) >= 0)
          )
        );
      }*/

      getComicsContains(search: string, myComics: Comics[]): Observable<Comics[]> {
        const filteredCharacters = myComics.filter((el: Comics) => el.title.toLowerCase().includes(search.toLowerCase()));
        return of(filteredCharacters);
      }

      getSeriesContains(search: string, mySeries: Series[]): Observable<Series[]> {
        const filteredCharacters = mySeries.filter((el: Series) => el.title.toLowerCase().includes(search.toLowerCase()));
        return of(filteredCharacters);
      }


      getCharactersContains(search: string, myCharacters: Character[]): Observable<Character[]> {
        const filteredCharacters = myCharacters.filter((el: Character) => el.name.toLowerCase().includes(search.toLowerCase()));
        return of(filteredCharacters);
      }


    
      getCharactersFirstLetter(letter: string, offset: number): Observable<Character[]> {
        return this.getCharacters(offset).pipe(
          map((characters: Character[]) =>
            characters.filter((el: Character) => el.name.toLocaleLowerCase()[0] === letter.toLocaleLowerCase())
          )
        );
      }
    
      getCharactersBeginWith(begin: string, offset: number): Observable<Character[]> {
        return this.getCharacters(offset).pipe(
          map((characters: Character[]) =>
            characters.filter((el: Character) => el.name.toLocaleLowerCase().indexOf(begin.toLocaleLowerCase()) === 0)
          )
        );
      }

    protected extractCharacterInfo(results: any[]): Character[] {
        return results.map((character: any): Character =>
        ({
            id: character.id,
            name: character.name,
            description: character.description,
            img: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        }));
    }

    protected extractSeriesInfo(results: any[]): Series[] {
      return results.map((series: any): Series =>
      ({
          id: series.id,
          title: series.title,
          description: series.description,
          img: `${series.thumbnail.path}.${series.thumbnail.extension}`,
      }));
  }

  protected extractComicsInfo(results: any[]): Comics[] {
    return results.map((comics: any): Comics =>
    ({
        id: comics.id,
        title: comics.title,
        description: comics.description,
        img: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
    }));
}
}


