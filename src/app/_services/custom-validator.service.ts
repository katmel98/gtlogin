import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  static emailUserLengthValidator(control: FormControl) {
    let email = control.value;
    if (email && email.indexOf('@') !== -1) {
      let [domainUser, domain] = email.split('@');
      if ( domainUser.length <= 5 ) {
        return {
          emailUserLength: {
            parsedEmailUserLength: domainUser
          }
        };
      }
    }
    return null;
  }

  static checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirm = group.controls.confirm.value;

    const evaluation = pass === confirm ? null : { notMatchPassword: true };

    return evaluation;
  }
}
