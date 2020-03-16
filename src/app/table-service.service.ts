import { Injectable } from '@angular/core';
import { Node } from './node';
@Injectable({
  providedIn: 'root'
})
export class TableServiceService {
  nodeTable: Node[][];
  constructor() {}
  createNewTable(x: number, y: number): Node[][] {
    this.nodeTable = [];
    for (let i = 0; i < x; i++) {
      this.nodeTable[i] = [];
      for (let j = 0; j < y; j++) {
        this.nodeTable[i][j] = new Node();
      }
    }
    return this.nodeTable;
  }
}
