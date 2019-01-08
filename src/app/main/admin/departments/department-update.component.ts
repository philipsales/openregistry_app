import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'app/core/services';
import { Department } from 'app/core/models';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-department-update',
  templateUrl: './department-update.component.html',
  styleUrls: ['./department-update.component.css']
})
export class DepartmentUpdateComponent implements OnInit {
  departmentId: string;
  serviceErrorMessage = "";
  department = new Department();

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private notificationService: NotificationsService
  ) { }

  ngOnInit() {
    this.departmentId = this.route.snapshot.paramMap.get('id');
    this.departmentService.get(this.departmentId)
    .subscribe(department => {
      this.department = department;
    });
  }

  doSave(department: Department) {
    department.id = this.departmentId;
    this.departmentService.update(department).subscribe(department => {
      this.department = department;
      this.notificationService.success(
        'Department : ' + department.name,
        'Successfully Updated',
        {
          timeOut: 30*1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
        });
    }, error => {
      this.serviceErrorMessage = error;
    });
  }

}
