import {CellState} from './cell-state.enum';
import {Coord} from './coord';
export class Node {

   private _state: CellState;
   private _coords: Coord;
   private _opened: boolean;

   constructor(x: number, y: number) {
     this._state = CellState.empty;
     this._coords = new Coord(x, y);
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


  getOpened(): boolean {
    return this._opened;
  }

  setOpened(value: boolean) {
    this._opened = value;
  }
}
