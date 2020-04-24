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
    this._startCoords = null;
    this._endCoords = null;
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
    if(this._endCoords != null && this._endCoords != value){
      this.at(this._endCoords).setState(CellState.empty);
    }
    this._endCoords = value;
  }
  getStartCoords(): Coord {
    return this._startCoords;
  }

  setStartCoords(value: Coord) {
    if(this._startCoords != null && this._startCoords != value){
      this.at(this._startCoords).setState(CellState.empty);
    }
    this._startCoords = value;
  }

  at(c: Coord): Node{
    return this._nodeTable[c.getX()][c.getY()];
  }

  getForbiddens(): Node[] {
    let obstacles: Node[] = new Array();

    this._nodeTable.forEach(function(e) {
      e.forEach(function(n) {
        if (n.getState() === CellState.forbidden)
          obstacles.push(n);
      })
    });
    return obstacles;
  }

    getAdyacents(origen: Coord): Node[]{

      let result: Node[] = new Array<Node>();
      if (origen == null) return result;

      for (let i = origen.getX()-1; i<=origen.getX()+1; i++) {
        for(let j = origen.getY()-1; j<=origen.getY()+1; j++) {
          if(j>=0 && i>=0 && j<this._numColumns && i<this._numRows && (this._nodeTable[i][j].getCoords()!=origen)) {
            result.push(this._nodeTable[i][j]);
          }
        }
      }
      return result;
    }

}
