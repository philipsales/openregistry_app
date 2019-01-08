import { Component, OnInit } from '@angular/core';
import { Department } from 'app/core/models';
import { DepartmentService } from 'app/core/services';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {
  readonly=false;
  serviceErrorMessage = "";

  constructor(
    private departmentService: DepartmentService,
    private notificationService: NotificationsService) { }

  ngOnInit() {
  }

  doSave(department: Department) {
    this.departmentService.create(department).subscribe(department => {
      this.readonly = true;
      this.notificationService.success(
        'New Department : ' + department.name,
        'Successfully Created',
        {
          timeOut: 30*1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
        }
      );
    }, error => {
      this.serviceErrorMessage = error;
    });
  }

}
