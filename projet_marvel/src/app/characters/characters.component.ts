import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit, OnDestroy {

    @Input() character: any
    @Output() eventOut = new EventEmitter<string>()
    isHidden: boolean = false;

    
    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    onClick() {
        this.eventOut.emit(this.character.name)
    }
    
    onClickDetail() {
      this.router.navigate(['/characters', this.character.id, 'detail'])
  }

    ngOnDestroy(): void {
    }
}