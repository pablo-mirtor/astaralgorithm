import { Component, OnInit } from '@angular/core';
import {newArray} from '@angular/compiler/src/util';
import {CellState} from '../cell-state.enum';
import {Node} from '../node';
import {TableServiceService} from '../table-service.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  nodeTable = this.tableService.createNewTable(9, 9);;
  numRows: number;
  numColumns: number;
  constructor(private tableService: TableServiceService) {
  }

  ngOnInit(): void {
  }

  cellClicked(node: Node): void{
    node.state = CellState.forbidden;
  }

  updateTable(): void{
    this.nodeTable = this.tableService.createNewTable(this.numRows, this.numColumns);
  }
}
