import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { SignUpInfo } from 'app/auth/signup-info';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

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
 
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrManager) { }
 
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
        this.toastr.successToastr('Registro efetuado com sucesso.','Sucesso');
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
