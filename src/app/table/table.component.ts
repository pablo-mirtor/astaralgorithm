import {Component, OnInit} from '@angular/core';
import {CellState} from '../cell-state.enum';
import {Node} from '../node';
import {TableServiceService} from '../table-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  nodeTable = this.tableService.createNewTable(9, 9);
  numRows: number;
  numColumns: number;
  clickEnableStart: boolean;
  clickEnableEnd: boolean;
  restartButton: boolean = false;
  constructor(private tableService: TableServiceService) {
    this.numRows = 9;
    this.numColumns = 9;
    this.restartButton = false;
  }

  ngOnInit(): void {
  }

  cellClicked(node: Node): void{
    if(this.clickEnableStart) {
      node.setState(CellState.start);
      this.nodeTable.setStartCoords(node.getCoords());
      this.clickEnableStart = false;
      return;
    }
    if(this.clickEnableEnd) {
      node.setState(CellState.end);
      this.nodeTable.setEndCoords(node.getCoords());
      this.clickEnableEnd = false;
      return;
    }
    if(node.getState() === CellState.empty) {
      node.setState(CellState.forbidden);
      return;
    }

    if(node.getState() === CellState.start)
      this.nodeTable.setStartCoords(null);
    else if(node.getState() === CellState.end)
      this.nodeTable.setEndCoords(null);

    node.setState(CellState.empty);
  }


  updateTable(): void{
    if(this.numRows >= 3 && this.numRows <= 9 && this.numColumns >= 3 && this.numColumns <= 9)
      this.nodeTable = this.tableService.createNewTable(this.numRows, this.numColumns);
    else
      alert("El mínimo de filas/columnas es 3 y el máximo 10");
  }

  iniEnable(): void{
    this.clickEnableStart = true;
    this.clickEnableEnd = false;
  }

  endEnable(): void{
    this.clickEnableEnd = true;
    this.clickEnableStart = false;
  }

  solve(): void{
    if(this.tableService.table.getStartCoords() == null)
      alert("Selecciona un inicio");
    else if(this.tableService.table.getEndCoords() == null)
      alert("Selecciona un final");
    else {
      this.tableService.solveMap();
      this.restartButton = true;
    }
  }

  restart(): void{
    this.updateTable();
    this.restartButton = false;
  }
}
