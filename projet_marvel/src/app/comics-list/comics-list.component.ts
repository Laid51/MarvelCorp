import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.css']
})
export class ComicsListComponent {
  @Input() comics: any
  @Output() eventOut = new EventEmitter<string>()
  isHidden: boolean = false;

  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick() {
      this.eventOut.emit(this.comics.title)
  }
  
  onClickDetail() {
    this.router.navigate(['/comics', this.comics.id, 'detail'])
}

  ngOnDestroy(): void {
  }
}
