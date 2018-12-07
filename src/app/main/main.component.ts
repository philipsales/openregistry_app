import { Component, OnInit } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Helper } from '../core/helper';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public static isExpired: boolean = false;
  private debounce = false;
  private firstTime = true;
  private warningShown = false;

  constructor(
    private router: Router,
    private userIdle: UserIdleService,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe(count => {
      console.log(count, 'count');
      if (this.firstTime) {
        this.firstTime = false;
        return;
      }
      if (!this.debounce) {
        this.debounce = true;
        this.warningShown = true;
        this._notificationsService.warn(
          'Warning',
          'Session is expiring due to inactivity...',
          {
            timeOut: 60*1000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
          }
        );
      }
    });
    this.userIdle.onTimeout().subscribe(() => {
      this.userIdle.stopWatching();
      MainComponent.isExpired = true;
      Helper.logout(this.router);
    });

    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());

    window.addEventListener('beforeunload', e => {
      Helper.logout(this.router);
    });
  }

  private reset() {
    this.debounce = false;
    if (this.warningShown) {
      this.warningShown = false;
      this._notificationsService.remove();
    }
    this.userIdle.resetTimer();
  }

}
