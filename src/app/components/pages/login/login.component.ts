import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    errMessage = "";
    isLoginFailed = false;
    isLoggedIn = false;
  constructor(private service: MemberService,
              private router: Router,
              private tokenStorage: TokenStorageService
  ) {

  }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
        this.isLoggedIn = true;
    } else {
      this.loginForm = new FormGroup({
        email: new FormControl(),
        password: new FormControl()
      });
    }
  }

  doLogin(){
    let login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    // window.alert(login.email + " " + login.password);
    this.service.login(login)  
      .subscribe((res)=>{
          this.tokenStorage.saveToken(res.token);
          this.tokenStorage.saveUser(res.userCredentials);
          this.isLoggedIn = true;
         window.location.reload();
        // this.router.navigate(["/"]);
    },
      err => {
          this.errMessage = err.error.msg;
          this.isLoginFailed = true;
          console.log(this.errMessage);
      }
    );
  }

}
