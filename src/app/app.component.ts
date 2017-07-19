import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './shared/auth.service';
import { ConfirmComponent } from './shared/confirm/confirm.component';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  static CONFIRM = 'APPComponent_CONFIRM';

  constructor(
    private auth: AuthService,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map((route) => {
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route;
    })
    .filter((route) => route.outlet === 'primary')
    .mergeMap((route) => route.data)
    .subscribe((event) => this.titleService.setTitle(event['title']));
  }

  isGuest(): boolean {
    return !this.auth.loggedIn();
  }

  logout() {
    const modalRef = this.modalService.open(ConfirmComponent, { windowClass: 'confirmModal' });
    modalRef.componentInstance.confirmKey = AppComponent.CONFIRM;
    modalRef.componentInstance.title = 'Logout?';
    modalRef.componentInstance.message = 'Are you sure you want to logout?';

    modalRef.result.then(response => {
      if (response === AppComponent.CONFIRM) {
        this.auth.logout('login');
      }
    });
  }
}
