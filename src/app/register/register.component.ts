import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { SignUpInfo } from 'app/auth/signup-info';

@Component({
  selector: 'emrede-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
 
  constructor(private authService: AuthService) { }
 
  ngOnInit() { }
 
  onSubmit() {
    console.log(this.form);
 
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.login,
      this.form.email,
      this.form.senha);
 
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
