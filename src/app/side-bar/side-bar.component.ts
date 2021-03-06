import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, OnDestroy {
  constructor(private router: Router,
    private loginService: Router) { }
  isLogin: boolean = true;
  routerEvents$: Subscription;
  ngOnInit() {
    this.routerEvents$ = this.router.events.subscribe((val) => {
      // see also 
      console.log(val)
      if (val instanceof NavigationEnd) {
        if (val.url == '/login') {
          this.isLogin = true;
        } else {
          this.isLogin = false
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }

  ngOnDestroy() {
    if (this.routerEvents$) {
      this.routerEvents$.unsubscribe();
    }
  }

}
