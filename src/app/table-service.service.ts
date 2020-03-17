import {Injectable} from '@angular/core';
import {Node} from './node';
import {CellState} from './cell-state.enum';
import {Coord} from './coord';
import {Table} from './table';
@Injectable({
  providedIn: 'root'
})
export class TableServiceService {
  table: Table;
  nodeTable: Node[][];
  iniCoords: Coord;
  endCoords: Coord;
  rows: number;
  columns: number;
  constructor() {}
  createNewTable(x: number, y: number): Table {
    this.table = new Table(x,y);
    return this.table;
  }

  findIniPos(): Coord {
    for (let i = 0; i < this.rows; i++) {
      this.nodeTable[i] = [];
      for (let j = 0; j < this.columns; j++) {
        if (this.nodeTable[i][j].getState() === CellState.start) {
          this.iniCoords = this.nodeTable[i][j].getCoords()
          return this.iniCoords;
        }
      }
    }
    return null;
  }

  findEndPos(): Coord {
    for (let i = 0; i < this.rows; i++) {
      this.nodeTable[i] = [];
      for (let j = 0; j < this.columns; j++) {
        if (this.nodeTable[i][j].getState() === CellState.end) {
          this.endCoords = this.nodeTable[i][j].getCoords()
          return this.endCoords;
        }
      }
    }
    return null;
  }

  solveMap() : Table{
    return null;
  }
}
