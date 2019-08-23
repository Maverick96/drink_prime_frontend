import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @ViewChild('sidebar') sideBar: ElementRef;
  constructor(private router: Router,
    private loginService: Router) { }
  isLogin: boolean = true;
  ngOnInit() {
    this.router.events.subscribe((val) => {
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

}
