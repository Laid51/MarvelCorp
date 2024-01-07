import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, forkJoin, map, BehaviorSubject} from 'rxjs';
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

    //limit établie à 100 pour avoir le maximum de personnages par appel d'API (utilisé dans certaines fonction qui utilisent un appek d'API)
    LIMIT = 100

    //création de la chaîne de caractère qui sera inclue dans l'url poyr les appels d'API dans certaines fonctions
    LIMIT2 = "limit=100"

    //offset qui varie de 100 à chaque iteraion pour obtenir des personnages différents 
    OFFSET_NUM = 0

    //création de la chaîne de caractère qui sera inclue dans l'url poyr les appels d'API
    OFFSET = "&offset=$" + this.OFFSET_NUM

    //clé d'api qui contient une clé et son hash nécessaire aux appels d'api
    API_KEY = "&apikey=7100c52016691ef1572e3ad00a397bdb&ts=1702042186&hash=2eea267d3ff770553ef0a6424a4f315c"
   

    constructor(private http: HttpClient) { }


    //Fonction qui fait un appel d'API pour récupérer une liste de comics en fonction de l'offset 
    getComics(): Observable<Comics[]> {
      const requestUrl = `${this.BASE_URL_COMICS}?${this.API_KEY}`;
  
      return this.http.get<any>(requestUrl).pipe(
        map(response => response.data.results),
        //Appel de la fonction extractComicsInfo() pour extraire les données de l'API qui nous intéressent
        map(results => this.extractComicsInfo(results))
      );
    }


//Fonction qui fait un appel d'API pour récupérer une liste de série en fonction de l'offset 
    getSeries(): Observable<Series[]> {
      const requestUrl = `${this.BASE_URL_SERIES}?${this.API_KEY}`;
  
      return this.http.get<any>(requestUrl).pipe(
        map(response => response.data.results),
        //Appel de la fonction extractSeriesInfo() pour extraire les données de l'API qui nous intéressent
        map(results => this.extractSeriesInfo(results))
      );
    }


//Fonction qui fait un appel d'API pour récupérer une liste de personnages en fonction de l'offset 
    getCharacters(offset: number): Observable<Character[]> {
        const requestUrl = `${this.BASE_URL}?limit=${this.LIMIT}&offset=${offset}${this.API_KEY}`;
    
        return this.http.get<any>(requestUrl).pipe(
          map(response => response.data.results),
          //Appel de la fonction extractCharacterInfo() pour extraire les données de l'API qui nous intéressent
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


//récupération d'une série à partie de son ID
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

  //récupération d'un comics à partie de son ID
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

//récupération des comics qui contiennent une certaine chaine de caractère 
      getComicsContains(search: string): Observable<Comics[]> {
        return this.getComics().pipe(
            map((comics: Comics[]) => comics.filter((el: Comics) => el.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) >= 0))
        )
    }

//récupération des comics qui contiennent une certaine chaine de caractère 
      getSeriesContains(search: string): Observable<Series[]> {
        return this.getSeries().pipe(
            map((series: Series[]) => series.filter((el: Series) => el.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) >= 0))
        )
    }

//récupération des personnages qui contiennent une certaine chaine de caractère (pour la barre de recherche de la page d'acceuil).
      getCharactersContains(search: string, offset:number): Observable<Character[]> {
        return this.getCharacters(offset).pipe(
          map((characters: Character[]) =>
            characters.filter((el: Character) => el.name.toLowerCase().includes(search.toLowerCase()))
          )
        )
      }


//récupération des personnages qui dont la première lettre du nom est celle spécifiée en cliauant dans la barre de lettre de la page d'acceuil.
      getCharactersFirstLetter(letter: string, offset: number): Observable<Character[]> {
        return this.getCharacters(offset).pipe(
          map((characters: Character[]) =>
            characters.filter((el: Character) => el.name.toLocaleLowerCase()[0] === letter.toLocaleLowerCase())
          )
        );
      }
    
//extraction des information de l'api pour les classer dans une instance de personnage (intgerface Character)     
    protected extractCharacterInfo(results: any[]): Character[] {
        return results.map((character: any): Character =>
        ({
            id: character.id,
            name: character.name,
            description: character.description,
            img: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        }));
    }

//extraction des information de l'api pour les classer dans une instance de série (intgerface Series)     
    protected extractSeriesInfo(results: any[]): Series[] {
      return results.map((series: any): Series =>
      ({
          id: series.id,
          title: series.title,
          description: series.description,
          img: `${series.thumbnail.path}.${series.thumbnail.extension}`,
      }));
  }

  //extraction des information de l'api pour les classer dans une instance de comics (intgerface Comics)     
  protected extractComicsInfo(results: any[]): Comics[] {
    return results.map((comics: any): Comics =>
    ({
        id: comics.id,
        title: comics.title,
        description: comics.description,
        img: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
    }));
}

//Fonction permettant de rechercher parmis tous les personnages (plusieurs appels d'API) car un seul appel ne permet de chercher que dans maximum  personnages.
//Plusieurs appel de la fonction getCharactersContains() sont fait en conséquence
private searchResultsSubject = new BehaviorSubject<Character[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();

handleSearch(value: string): void {
  const requests: Observable<Character[]>[] = [];

  //16 itération pour faire 16 appels d'API différents pour avoir tous les personnages de l'api car seulement 100 personnages par appel d'API peuvent être obtenus
  for (let i = 0; i < 16; i++) {
    const offset = 100 * i;
    requests.push(this.getCharactersContains(value, offset));
  }

  

  forkJoin(requests).subscribe(results => {
    const combinedResults = results.flat(); 
    this.searchResultsSubject.next(combinedResults);
  });
}
}


