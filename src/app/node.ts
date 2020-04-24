import {CellState} from './cell-state.enum';
import {Coord} from './coord';

export class Node {

   private _state: CellState;
   private _coords: Coord;
   private _h: number;
   private _g: number;
   private _f: number;
   private _father: Node;

   constructor(x: number, y: number) {
     this._state = CellState.empty;
     this._coords = new Coord(x, y);
     this._father = null;
   }

  getState(): CellState {
    return this._state;
  }

  setState(value: CellState) {
    this._state = value;
  }

  getCoords(): Coord {
    return this._coords;
  }

  setCoords(value: Coord) {
    this._coords = value;
  }

  setFather(value: Node){
     this._father = value;
  }

  getFather(): Node{
     return this._father;
  }

  getH(): number {
    return this._h;
  }

  setH(value: number) {
    this._h = value;
  }

  getG(): number {
    return this._g;
  }

  setG(value: number) {
    this._g = value;
  }

  getF(): number {
    return this._f;
  }

  updateF() {
    this._f = this._h + this._g;
  }
}
