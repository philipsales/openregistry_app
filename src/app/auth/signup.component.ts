import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, UserService } from 'app/core/services';
import { User } from 'app/core/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  _show: boolean;
  @Input() set show(value: boolean) {
    console.warn(this._show);
    this._show = value;
    this.reset();
  }// -- _reinit setter

  model: any = {};
  loading = false;
  error = '';
  show_reset = false;
  is_successful = false;
  is_error = false;
  confirm_password = '';
  valid_email = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService) {
  }

  ngOnInit() {
  }// --ngOnInit

  validateEmail() {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.valid_email = re.test(this.model['username']);
  }

  reset() {
    this.model = {};
    this.is_successful = false;
    this.loading = false;
    this.is_error = false;
    this.confirm_password = '';
    this.valid_email = false;
  }

  signup() {
    this.is_error = false;
    this.is_successful = false;
    this.loading = true;
    const user = User.fromJSON(this.model);
    console.log(user);
    this.userService.create(user).subscribe(
      created_user => {
        this.loading = false;
        console.warn('OK!');
        this.is_successful = true;
      },
      errors => {
        this.error = errors;
        this.loading = false;
        this.is_error = true;
      });
    /*
    this.authService.login(this.model.username, this.model.password).subscribe(
      result => {
          console.log(result, 'RESULT');
        if (result['status'] === true) {
          this.router.navigate(['']);
        } else {
          this.error = 'Username or password is incorrect';
              this.loading = false;
        }
      }, error => {
          const error_message = JSON.parse(error).message;
          this.error = error_message;
          this.loading = false;
        });
        */
  }// --login

  onUpdatedUserEvent(new_password: string) {
  }

  onCancelUpdatedEvent() {
  }
}
