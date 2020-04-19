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

  solveMap() : void{
      if(this.table.getStartCoords()==null || this.table.getEndCoords()==null) return null;

      let open: Node[] = new Array<Node>();
      open.push(this.table.at(this.table.getStartCoords()));

      let closed: Node[] = this.table.getObstacles();

      let cameFrom: Map<Node,Node> = new Map<Node, Node>();

      let g: Map<Node, number> = new Map<Node, number>();
      g.set(this.table.at(this.table.getStartCoords()), 0.00);

      let f: Map<Node, number> = new Map<Node, number>();
      f.set(this.table.at(this.table.getStartCoords()), this.distanceTo(this.table.getStartCoords(), this.table.getEndCoords()));


      while(open.length != 0) {
        let current: Node = this.getMinimum(open, f);
        if ((current)===this.table.at(this.table.getEndCoords())) {
          this.reconstructedPath(this.table.at(this.table.getEndCoords()), cameFrom);
          return;
        }//reconstructedPath(this.table.getEndCoords(), cameFrom);
        else {
          let index = open.indexOf(current);
          open.splice(index, 1);
          closed.push(current);

          for (let ady of this.table.getAdyacents(current.getCoords())) {

            if (closed.includes(ady))
              continue;

            let tempG: number = g.get(current) + this.distanceTo(current.getCoords(),ady.getCoords());

            if(!open.includes(ady))
              open.push(ady);
            else if (tempG >= g.get(ady))
              continue;

            cameFrom.set(ady, current);

            g.set(ady, tempG);

            let estimatedH: number = this.distanceTo(ady.getCoords(), this.table.getEndCoords());

            let estimatedF: number = g.get(ady) + estimatedH;

            f.set(ady, estimatedF);
          }
      }
    }
    alert("No hay solución");
    return null;
  }

 distanceTo(or: Coord, dest: Coord): number{
   let dist: number= Math.hypot(dest.getX()-or.getX(), dest.getY()-or.getY());
    return dist;
  }

  getMinimum(open: Node[], f: Map<Node, number>) : Node{
      let min: number = f.get(open[0]);
      let minCell: Node = open[0];
      open.forEach(function(e){
        if(f.get(e) < min){
          minCell = e;
          min = f.get(e);
        }
      });
  return minCell;
  }

  reconstructedPath( current: Node, cameFrom: Map<Node, Node> ): void{
      while (current != null) {
          let previous: Node = cameFrom.get(current);
          if(current.getState() == CellState.empty)
            current.setState(CellState.done);
          current = previous;
        }
  }
}
