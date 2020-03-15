import { Component, OnInit } from '@angular/core';
import {newArray} from '@angular/compiler/src/util';
import {CellState} from '../cell-state.enum'
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  nodeTable = [[CellState.empty, CellState.empty, CellState.empty],[CellState.empty, CellState.empty, CellState.empty]];
  numRows: number;
  numColumns: number;
  constructor() {

  }

  ngOnInit(): void {
  }

}
