import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

    logoPath: string = 'assets/Marvel.svg'

    constructor() { }

    ngOnInit(): void { }

}