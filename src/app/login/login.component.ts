import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Credential } from '../_models/credential.model';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      rememberme: [false]
    });

    this.authService.logout();

  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const creds = new Credential();
    creds.email = this.f.username.value;
    creds.password = this.f.password.value;

    this.submitted = true;

    // stop here if form is invalid
    if ((this.loginForm.invalid) || (creds.email === '') || (creds.password === '')) {
        return;
    }
    this.loading =  true;
    this.authService.login(creds)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
          // this.router.navigate([this.returnUrl]);
      },
      error => {
          console.log(error);
          this.loading = false;
      }
    );

  }

}
