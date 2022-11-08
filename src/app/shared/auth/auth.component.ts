import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode=true;
  errMsg: string = "";
  authObsrv: Observable<AuthResponseData> = new Observable();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onAuthFormSubmit(form: NgForm) {
    console.log("Submit login form...");
    console.log(form.value);

    if (!form.valid) return;

    this.errMsg = "";

    const { email, password } = form.value;

    if (this.isLoginMode) {
      this.authObsrv = this.authService.login(email, password)
    //   .subscribe({
    //     next: (res) => {
    //       console.log("Auth Login Response:" , res);
    //       if (this.errMsg) this.errMsg = ""
    //     },
    //     error: (err) => {
    //       console.error("Auth Res Error:", err);
    //       this.errMsg = err.message
    //     })

    //   }
    } else {
      this.authObsrv = this.authService.signup(email, password)

      // .subscribe({
      //     next: (res) => {
      //       console.log("Auth Response Success:" , res);
      //       this.errMsg = ''

      //     },
      //     error: (err) => {
      //       console.log("Auth Response Error:", err)
      //       this.errMsg = err.message
      //     }
      // }
      // );
    }

    this.authObsrv.subscribe({
      next: (res) => {
        console.log("Auth Response Success:" , res);
       if (this.errMsg) this.errMsg = null;

       this.router.navigate(['bookshelf'])
      },
        error: (err) => {
          console.log("Auth Response Error:", err)
              this.errMsg = err.message

      }
    })

    form.reset()
  }



}
