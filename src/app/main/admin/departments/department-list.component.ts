import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService, DepartmentsResultJSON } from 'app/core/services';
import { Department } from 'app/core/models';
import { PageEvent, MatPaginator } from '@angular/material';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator; // manually reset page index
  pagelength:number; // count from api call
  searchText = '';
  sort = 1; // desc == -1

  constructor(private deptService: DepartmentService) { }

  ngOnInit() {
    this.getDepartments();
  }

  doSearch(newObject: any) {
    let pageIndex = 0;
    let pageSize = 10;
    this.getDepartments({pageIndex, pageSize}, true);
  }

  doSort() {
    this.sort = this.sort == 1 ? -1 : 1;
    this.getDepartments(this.paginator);
  }

  getDepartments(paginator={
    pageIndex: 0, 
    pageSize: 10}, reset=false) {
    this.deptService.list(
      paginator.pageIndex, 
      paginator.pageSize, 
      this.searchText,
      this.sort)
    .subscribe((result: DepartmentsResultJSON) => {
      this.departments = result.departments;
      this.pagelength = result.count;
      if (reset) {
        this.paginator.pageIndex = 0;
      }
    });
  }

}
