import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AStarAlgorithm';
  tableMode: number = 0;
  countChangedHandler(mode: number) {
    this.tableMode = mode;
  }
}
