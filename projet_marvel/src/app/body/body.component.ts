import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'app-body',
    /*standalone: true,*/
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.css'],
    
})
export class BodyComponent implements OnInit{

  myClasses: any = {}
  myCharacters! : Array<any>
  lastCharacter: String = '(aucun)'

  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    this.dataService.getCharacters().subscribe(
        data => this.myCharacters = data
  )
  
    }
  onEvent = (event: any) => {
    this.lastCharacter = event
  }

}

