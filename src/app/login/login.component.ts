import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService) { }
  loginForm: FormGroup;
  login$: Subscription;
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login$ = this.loginService.login(this.loginForm.value).subscribe(res => {
        if (res['success']) {
          this.toastrService.success("Login Success", '', {
            timeOut: 2000
          });
          localStorage.setItem('token', res['token']);
          this.router.navigate(['lead-list']);
        } else {
          this.toastrService.error("Login Failed", '', {
            timeOut: 5000
          });
        }
      },
        err => {
          this.toastrService.error("Login Failed", '', {
            timeOut: 5000
          });
          console.error(err);
        })
    }
  }

  ngOnDestroy() {
    if (this.login$) {
      this.login$.unsubscribe();
    }
  }

}
