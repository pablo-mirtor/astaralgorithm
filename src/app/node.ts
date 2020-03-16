import {CellState} from './cell-state.enum';

export class Node {

   public state: CellState;

   constructor() {
     this.state = CellState.empty;
   }

  getState(): CellState {
     return this.state;
  }

  setState(cs: CellState): void {
     this.state = cs;
  }
}
