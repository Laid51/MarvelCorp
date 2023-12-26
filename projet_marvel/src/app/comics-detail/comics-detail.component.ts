import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-comics-detail',
  templateUrl: './comics-detail.component.html',
  styleUrls: ['./comics-detail.component.css']
})
export class ComicsDetailComponent {
  comics: any | null = null

  constructor(
      private route: ActivatedRoute,
      private dataService: DataService)
  { }

  ngOnInit(): void {
      this.route.paramMap.pipe(
          map( params => params.get('id') ?? '' ),
          switchMap( (id:string) => this.dataService.getComicsById(id))
      ).subscribe(
        comics => this.comics = comics
      )
  }
}
