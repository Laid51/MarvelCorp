import { Component } from '@angular/core';
import { AppModule } from './app.module';
[AppModule]

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
})
export class AppComponent {
  title = 'project_Web';
}
