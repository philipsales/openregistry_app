import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ForgotPassword } from 'app/core/models';
import { ForgotpasswordService as ForgotService } from 'app/core/services';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  @Output() fPassword = new EventEmitter<boolean>();

  model: ForgotPassword = new ForgotPassword('');
  
  isPasswordSent: boolean = false;

  _show: boolean;
  @Input() set show(value: boolean) {
    console.warn(this._show);
    this._show = value;
  }// -- _reinit setter

  constructor(
    private passwordService: ForgotService
  ) { }

  ngOnInit() {
  }

  submit(e) {
    console.log(this.isPasswordSent, 'password');
    this.passwordService.forgotPassword(this.model).subscribe(result => {
      this.isPasswordSent = true;
      if (result['status'] == 200) {
        // part of security is not to tell the user that
        // the email they've inserted may or may not exist
        // in our database
      } else if (result['status'] == 404) {
      }
    }, err=>{
      this.isPasswordSent = true;
    });
    e.preventDefault();
  }

}