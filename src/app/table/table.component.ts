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
  constructor(private tableService: TableServiceService) {
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
    node.setState(CellState.empty);
  }


  updateTable(): void{
    this.nodeTable = this.tableService.createNewTable(this.numRows, this.numColumns);
  }

  iniEnable(): void{
    this.clickEnableStart = true;
    this.clickEnableEnd = false;
  }

  endEnable(): void{
    this.clickEnableEnd = true;
    this.clickEnableStart = false;
  }
}
