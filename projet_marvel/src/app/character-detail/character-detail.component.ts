import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
    selector: 'app-character-detail',
    templateUrl: './character-detail.component.html',
    styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

    cocktails: any[]  = []

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService)
    { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            (params) => this.dataService.getCharacterFirstLetter(params.get('letter') ?? '').subscribe(
                data => this.cocktails = data
            )
        )
    }

}
