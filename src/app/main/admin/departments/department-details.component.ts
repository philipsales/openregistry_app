import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'app/core/models';
import { DepartmentService } from 'app/core/services';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {
  readonly = true;
  department: Department = new Department();

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.departmentService.get(id).subscribe(department => {
      this.department = department;
    });
  }

}
