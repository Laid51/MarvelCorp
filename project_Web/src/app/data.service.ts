import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    characters: any[] = []

    constructor() {
        this.characters.push( { name: '3-D Man', description: '3d man Le super hero de fou', img: 'assets/3d_man.jpg'} )
        this.characters.push( { name: 'A-Bomb (HAS)', description: "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ", img: 'assets/A_bomb.jpg'} )
        this.characters.push( { name: 'A.I.M.', description: "AIM is a terrorist organization bent on destroying the world.", img: 'assets/A.I.M.jpg'} )
    }

    getCharacters(): Observable<any[]> {
        return of(this.characters)
    }

}
