import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() count: number;

  @Output() countChanged: EventEmitter<number> =   new EventEmitter();

  changeMode(mode: number){
    this.countChanged.emit(mode);
  }
}
