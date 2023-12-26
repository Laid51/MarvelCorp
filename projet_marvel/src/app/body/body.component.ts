import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UntypedFormGroup, FormControl, Validators } from '@angular/forms';
import { Character } from 'src/character.interface';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  myCharacters: Character[] = [];
  lastCharacter: string = '';
  searchForm: UntypedFormGroup;
  searchCtrl: FormControl<string>;
  i = 0;

  constructor(private dataService: DataService) {
    this.searchCtrl = new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    });
    this.searchForm = new UntypedFormGroup({
      search: this.searchCtrl,
    });
  }

  ngOnInit(): void {
    this.myCharacters = [];
    for (let i = 0; i < 16; i++) {
      this.loadCharacters(100 * i);
    }

    this.searchCtrl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((val: string) => {
        this.dataService.handleSearch(val);
        return this.dataService.searchResults$;
      })
    )
    .subscribe((characters: Character[]) => (this.myCharacters = characters));
  }

  

  loadCharacters(offset: number): void {
    this.dataService.getCharacters(offset).subscribe((data) => {
      this.myCharacters.push(...data);
    });
  }

  onEvent = (event: any) => {
    this.lastCharacter = event;
  };

}
