import {Component, OnInit} from '@angular/core';
import {CellState} from '../cell-state.enum';
import {Node} from '../node';
import {TableServiceService} from '../table-service.service';

@Component({
  selector: 'app-table-way-points',
  templateUrl: './tablewaypoints.component.html',
  styleUrls: ['./tablewaypoints.component.css']
})
export class TableWayPointsComponent implements OnInit {
  nodeTable = this.tableService.createNewTable(9, 9);
  numRows: number;
  numColumns: number;
  clickEnableWayPoint: boolean;
  restartButton: boolean = false;
  cost: number[];
  wayPoints: Node[] = new Array<Node>();

  constructor(private tableService: TableServiceService) {
    this.numRows = 9;
    this.numColumns = 9;
    this.restartButton = false;
  }

  ngOnInit(): void {
  }

  cellClicked(node: Node): void{
    if(this.clickEnableWayPoint) {
      node.setState(CellState.wayPoint);
      this.wayPoints.push(node);
      this.clickEnableWayPoint = false;
      return;
    }
    if(node.getState() === CellState.empty) {
      node.setState(CellState.forbidden);
      return;
    }
    if(node.getState() === CellState.wayPoint) {
      this.wayPoints.splice(this.wayPoints.indexOf(node), 1);
    }

    node.setState(CellState.empty);
  }


  updateTable(): void{
    if(this.numRows >= 3 && this.numRows <= 9 && this.numColumns >= 3 && this.numColumns <= 9){
      this.wayPoints = new Array<Node>();
      this.nodeTable = this.tableService.createNewTable(this.numRows, this.numColumns);
    }
    else
      alert("El mínimo de filas/columnas es 3 y el máximo 9");
  }

  iniEnable(): void{
    this.clickEnableWayPoint = true;
  }


  solve(): void{
    if(this.wayPoints.length < 2)
      alert("Selecciona mínimo dos Way Points");
    else {
      this.cost = this.tableService.solveWayPoints(this.wayPoints);
      this.restartButton = true;
      if(this.cost.length < this.wayPoints.length)
        alert("No hay solución completa");
    }
  }

  restart(): void{
    this.updateTable();
    this.restartButton = false;
  }
}
