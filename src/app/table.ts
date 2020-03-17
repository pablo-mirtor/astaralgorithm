import {Node} from './node';
import {Coord} from './coord';
import {CellState} from './cell-state.enum';

export class Table {

  private _nodeTable: Node[][];
  private _numRows: number;
  private _numColumns: number;
  private _startCoords: Coord;
  private _endCoords: Coord;

  constructor(numRows: number, numColumns: number) {
    this._numRows = numRows;
    this._numColumns = numColumns;
    this._nodeTable = [];
    for (let i = 0; i < this._numRows; i++) {
      this._nodeTable[i] = [];
      for (let j = 0; j < this._numColumns; j++) {
        this._nodeTable[i][j] = new Node(i,j);
      }
    }
  }

  getNodeTable(): Node[][] {
    return this._nodeTable;
  }

  setNodeTable(value: Node[][]) {
    this._nodeTable = value;
  }

  getNumRows(): number {
    return this._numRows;
  }

  setNumRows(value: number) {
    this._numRows = value;
  }

  getNumColumns(): number {
    return this._numColumns;
  }

  setNumColumns(value: number) {
    this._numColumns = value;
  }

  getEndCoords(): Coord {
    return this._endCoords;
  }

  setEndCoords(value: Coord) {
    this._endCoords = value;
  }
  getStartCoords(): Coord {
    return this._startCoords;
  }

  setStartCoords(value: Coord) {
    this._startCoords = value;
  }

  at(c: Coord): Node{
    return this._nodeTable[c.getX()][c.getY()];
  }
}
