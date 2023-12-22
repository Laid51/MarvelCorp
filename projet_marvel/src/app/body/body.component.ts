import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { switchMap } from 'rxjs';
import { UntypedFormGroup, FormControl, Validators } from '@angular/forms';
import { Character } from 'src/character.interface';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],

})
export class BodyComponent implements OnInit {

  myClasses: any = {}
  myCharacters!: Array<any>
  lastCharacter: String = '(aucun)'
  searchForm: UntypedFormGroup
  searchCtrl: FormControl<string>

  constructor(private dataService: DataService) {
    this.searchCtrl = new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    })
    this.searchForm = new UntypedFormGroup({
      search: this.searchCtrl
    })
  }

  ngOnInit(): void {
    this.dataService.getCharacters().subscribe(
      data => this.myCharacters = data
    )
    this.searchCtrl.valueChanges.pipe(
      switchMap( (val: string) => this.dataService.getCharactersContains(val))
      ).subscribe(
          (characters: Character[]) => this.myCharacters = characters
  )
  }
  onEvent = (event: any) => {
    this.lastCharacter = event
  }

}

