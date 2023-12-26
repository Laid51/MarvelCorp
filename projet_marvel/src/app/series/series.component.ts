import { Component, OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { Series } from 'src/series.interface';
import { UntypedFormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {

  mySeries: Series[] = [];
  lastSeries: string = '';
  searchForm: UntypedFormGroup;
  searchCtrl: FormControl<string>;
  
  constructor(private dataService: DataService){
    this.searchCtrl = new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    });
    this.searchForm = new UntypedFormGroup({
      search: this.searchCtrl,
    });
  }

  ngOnInit(): void {
    this.mySeries = [];
      this.loadCharacters();
      this.searchCtrl.valueChanges
      .pipe(switchMap((val: string) => this.dataService.getSeriesContains(val)))
      .subscribe((series: Series[]) => (this.mySeries = series));

 
    
  }

  loadCharacters(): void {
    this.dataService.getSeries().subscribe((data) => {
      this.mySeries.push(...data);
    });
  }

  onEvent = (event: any) => {
    this.lastSeries = event;
  };

}
