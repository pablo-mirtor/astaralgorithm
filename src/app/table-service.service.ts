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

  solveMap(startNode: Node = this.table.at(this.table.getStartCoords()), endNode: Node = this.table.at(this.table.getEndCoords())) : number{

      let open: Node[] = new Array<Node>();

      let current: Node = startNode;
      open.push(current); //add the first node

      let closed: Node[] = this.table.getForbiddens();

      current.setG(0.00);
      current.setH(current.getCoords().calculateDistance(endNode.getCoords()));

      current.updateF();

      while(open.length != 0) {
        current = this.getMinimum(open);
        if ((current)===endNode) {
          this.getFinalPath(endNode);
          return current.getF();
        }
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

            ady.setH(ady.getCoords().calculateDistance(endNode.getCoords()));

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

  getFinalPath(current: Node): void{
      while (current != null) {
          let previous: Node = current.getFather();
          if(current.getState() == CellState.empty)
            current.setState(CellState.done);
          current.setG(0);
          current.setH(0);
          current.setFather(null);
          current = previous;
        }
  }

  solveWayPoints(wayPointsList: Node[]): number[] {
      let sols = new Array<number>();
      let nextIndex: number = 1;
      let second: Node = wayPointsList[0];
      let first = null;
      let totalCost : number = 0;
      let end: boolean = false;
      while (nextIndex < wayPointsList.length && !end) {
        first = second;
        second = wayPointsList[nextIndex];
        let temp = this.solveMap(first, second);
        if(temp == 0)
          end = true;
        else {
          nextIndex++;
          totalCost+= temp;
          sols.push(temp);
        }
    }
    sols.push(totalCost);
    return sols;
  }
}
