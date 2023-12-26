import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent {
  series: any | null = null

  constructor(
      private route: ActivatedRoute,
      private dataService: DataService)
  { }

  ngOnInit(): void {
      this.route.paramMap.pipe(
          map( params => params.get('id') ?? '' ),
          switchMap( (id:string) => this.dataService.getSeriesById(id))
      ).subscribe(
        series => this.series = series
      )
  }
}
