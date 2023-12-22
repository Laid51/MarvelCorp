import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-letter-bar',
  templateUrl: './letter-bar.component.html',
  styleUrls: ['./letter-bar.component.css']
})
export class LetterBarComponent implements OnInit {

    letters = new Array<string>()

    constructor(private router: Router) { }

    ngOnInit(): void {
        for(let i=0; i<26; i++) {
            this.letters.push(String.fromCharCode(i+65))
        }
    }

}