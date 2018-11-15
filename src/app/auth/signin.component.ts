import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/core/services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @Output() forgotPasswordEmit = new EventEmitter<boolean>();

  _show: boolean;
  @Input() set show(value: boolean) {
    console.warn(this._show);
    this._show = value;
  }// -- _reinit setter

  model: any = {};
  loading = false;
  error = '';
  show_reset = false;

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
  }// --ngOnInit

  showForgotPassword(e) {
    e.preventDefault();
    this.forgotPasswordEmit.emit(true);
  }

  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password).subscribe(
      result => {
        console.log(result, 'RESULT');
        if (result['status'] === true) {
          this.router.navigate(['my-account']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      }, error => {
        this.error = 'Username or password is incorrect';
        if (error['code'] == 401) {
          this.error = 'The account is inactive, please contact the system admin.';
        }
        this.loading = false;
        /*
        const error_message = JSON.parse(error).message;
        this.error = error_message;
        this.loading = false;
        */
      });
  }// --login

  onUpdatedUserEvent(new_password: string) {
  }

  onCancelUpdatedEvent() {
  }
}
