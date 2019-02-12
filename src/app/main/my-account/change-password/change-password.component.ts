import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { UserService, AuthService } from 'app/core/services';
import { NotificationsService } from 'angular2-notifications';
import { User } from 'app/core/models';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  errors: any = {};
  has_errors = false;
  is_processing = false;

  old_password = '';
  new_password = '';
  confirmation_password = '';

  user: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private _notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.errors = {};
    this.has_errors = false;
    this.is_processing = true;
    this.user = User.fromJSON(JSON.parse(localStorage.getItem('user')));
  }

  onResetForm(form: NgForm) {
    this.old_password = '';
    this.new_password = '';
    this.confirmation_password = '';
    form.reset();
  }

  onSaveClick() {
    this.errors = {};
    this.has_errors = false;
    this.is_processing = true;
    this.authService.checkPassword(this.user.username, this.old_password).subscribe(
      result => {
        if (result) {
          this.changeMyPassword();
        } else {
          this.errors = {
            'old_password': 'Incorrect Old Password'
          };
          this.has_errors = true;
          this.is_processing = false;
        }
      }, error => {
        this.errors = {
          'old_password': error
        };
        this.has_errors = true;
        this.is_processing = false;
      });

  }

  changeMyPassword() {
    this.userService.updateMyPassword(this.user.id, this.new_password).subscribe(
      created_user => {
        this.is_processing = false;
        this._notificationsService.success(
          'Account Settings',
          'Successfully changed password!',
          { 
            timeOut: 10000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
          });
      },
      errors => {
        this.errors = errors;
        this.has_errors = true;
        this.is_processing = false;
      });
  }

}
