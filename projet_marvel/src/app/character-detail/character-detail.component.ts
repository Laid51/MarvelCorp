import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { map, switchMap } from 'rxjs';

@Component({
    selector: 'app-character-detail',
    templateUrl: './character-detail.component.html',
    styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

    character: any | null = null

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService)
    { }

    ngOnInit(): void {
        this.route.paramMap.pipe(
            map( params => params.get('id') ?? '' ),
            switchMap( (id:string) => this.dataService.getCharacterById(id))
        ).subscribe(
            character => this.character = character
        )
    }

}
