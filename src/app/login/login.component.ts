import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Credential } from '../_models/credential.model';
import { first } from 'rxjs/operators';
import { AppConfigService } from '../_services/app-config.service';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidatorService } from '../_services/custom-validator.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  private config;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
  ) {
    this.config = AppConfigService.settings;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email, CustomValidatorService.emailUserLengthValidator])],
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
          window.location.href = `${this.config.redirectionApp.admin}?user_id=${creds.email}`;
      },
      error => {
          console.log(error);
          let info: string;
          if ( error.status === 400 ) {
              info = this.translate.instant('frontend_error_login_email_not_valid_text')
          } else if (error.status === 404) {
              info = this.translate.instant('frontend_error_login_user_not_found_text')
          } else if (error.status === 403) {
              info = this.translate.instant('frontend_error_login_invalid_credentials_text')
          }
          swal({
            text: info,
            title: '',
            type: 'error',
            toast: true,
            position: 'top',
            timer: this.config.errors.toast_timer,
            showConfirmButton: false
          });
          this.loading = false;
      }
    );
  }

}
