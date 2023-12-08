import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent implements OnInit, OnDestroy {

    @Input() characters: any
    @Output() eventOut = new EventEmitter<string>()
    isHidden: boolean = false;

    Description: Array<string> = new Array<string>()
    
    constructor() { }

    ngOnInit(): void {
    }

    onClick() {
        this.eventOut.emit(this.characters.name)
    }

    ngOnDestroy(): void {
    }
}