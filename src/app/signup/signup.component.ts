import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppConfigService } from '../_services/app-config.service';
import { User } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { CustomValidatorService } from '../_services/custom-validator.service';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  submitted = false;
  private config;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this.config = AppConfigService.settings;
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, CustomValidatorService.emailUserLengthValidator])],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
      terms: [false]
    }, { validator: CustomValidatorService.checkPasswords});
  }

  get f() {
    return this.signupForm.controls;
  }

  get f_group() {
    return this.signupForm;
  }

  onSubmit() {
    const user = new User();
    user.email = this.f.email.value;
    user.password = this.f.password.value;

    this.submitted = true;

    // stop here if form is invalid
    if ((this.signupForm.invalid) || (user.email === '') || (user.password === '')) {
        return;
    }
    this.loading =  true;
    if ( this.f.terms.value === true) {
      this.authService.register(user)
      .subscribe(
        data => {
          console.log(data);
            // this.router.navigate([this.returnUrl]);
            // window.location.href = '/login';
        },
        error => {
            console.log(error);
            this.loading = false;
        }
      );
    } else {
      const info = this.translate.instant('frontend_error_signup_terms_needed_text')
      swal({
        text: info,
        title: '',
        type: 'error',
        toast: true,
        position: 'top',
        timer: 7200,
        showConfirmButton: false
      });
      this.loading = false;
    }
  }

}