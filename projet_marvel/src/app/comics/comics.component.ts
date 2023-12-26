import { Component } from '@angular/core';
import { UntypedFormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Series } from 'src/series.interface';
import { DataService } from '../data.service';
import { Comics } from 'src/comics.interface';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent {
  myComics: Comics[] = [];
  lastComics: string = '';
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
    this.myComics = [];
      this.loadCharacters();
      
      this.searchCtrl.valueChanges
      .pipe(switchMap((val: string) => this.dataService.getComicsContains(val)))
      .subscribe((series: Series[]) => (this.myComics = series));

 
    
  }

  loadCharacters(): void {
    this.dataService.getComics().subscribe((data) => {
      this.myComics.push(...data);
    });
  }

  onEvent = (event: any) => {
    this.lastComics = event;
  };

}
