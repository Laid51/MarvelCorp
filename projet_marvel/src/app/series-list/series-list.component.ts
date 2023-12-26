import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent {
  @Input() series: any
  @Output() eventOut = new EventEmitter<string>()
  isHidden: boolean = false;

  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick() {
      this.eventOut.emit(this.series.title)
  }
  
  onClickDetail() {
    this.router.navigate(['/series', this.series.id, 'detail'])
}

  ngOnDestroy(): void {
  }
}
