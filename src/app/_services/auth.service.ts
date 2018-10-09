import { AppConfigService } from './app-config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Credential } from '../_models/credential.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private config;

  constructor(
        private http: HttpClient,
  ) {
        this.config = AppConfigService.settings;
  }

  login(creds: Credential) {
        console.log(creds);
        console.log(this.config);
        return this.http.post<any>(`${this.config.apiServer.localLogin}/auth/login`, creds)
        .pipe(map(user => {
            console.log(user);
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        }));
    }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }

}
