import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/character.interface';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent {
  @Input() characters: Character[] = []
  @Output() eventOut: EventEmitter<string> = new EventEmitter<string>()

    constructor() { }

    ngOnInit(): void {
    }

    onEvent = (event: any) => {
        this.eventOut.emit(event)
    }
}
