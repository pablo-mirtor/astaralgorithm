import {Injectable} from '@angular/core';
import {Node} from './node';
import {Table} from './table';
import {Coord} from './coord';
import {CellState} from './cell-state.enum';

@Injectable({
  providedIn: 'root'
})
export class TableServiceService {
  table: Table;
  constructor() {}
  createNewTable(x: number, y: number): Table {
    this.table = new Table(x,y);
    return this.table;
  }

  solveMap() : number{

      let open: Node[] = new Array<Node>();

      let current: Node = this.table.at(this.table.getStartCoords());
      open.push(current); //add the first node

      let closed: Node[] = this.table.getForbiddens();

      current.setG(0.00);
      current.setH(current.getCoords().calculateDistance(this.table.getEndCoords()));

      current.updateF();

      while(open.length != 0) {
        current = this.getMinimum(open);
        if ((current)===this.table.at(this.table.getEndCoords())) {
          this.reconstructedPath(this.table.at(this.table.getEndCoords()));
          return current.getF();
        }//reconstructedPath(this.table.getEndCoords(), cameFrom);
        else {
          let index = open.indexOf(current);
          open.splice(index, 1);
          closed.push(current);

          for (let ady of this.table.getAdyacents(current.getCoords())) {

            if (closed.includes(ady))
              continue;

            let tempG: number = current.getG() + current.getCoords().calculateDistance(ady.getCoords());
            if(!open.includes(ady))
              open.push(ady);
            else if (tempG >= ady.getG())
              continue;

            ady.setFather(current); //!!

            ady.setG(tempG);

            ady.setH(ady.getCoords().calculateDistance(this.table.getEndCoords()));

            ady.updateF();

          }
      }
    }
    return 0;
  }



  getMinimum(open: Node[]) : Node{
      let min: number = open[0].getF();
      let minCell: Node = open[0];
      open.forEach(function(e){
        if(e.getF() < min){
          minCell = e;
          min = e.getF();
        }
      });
  return minCell;
  }

  reconstructedPath( current: Node): void{
      while (current != null) {
          let previous: Node = current.getFather();
          if(current.getState() == CellState.empty)
            current.setState(CellState.done);
          current = previous;
        }
  }
}
