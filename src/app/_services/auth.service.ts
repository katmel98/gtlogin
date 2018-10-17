import { AppConfigService } from './app-config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Credential } from '../_models/credential.model';
import { User } from '../_models/user.model';
import * as CryptoJS from 'crypto-js';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private config;
  private baseUrl;

  constructor(
        private http: HttpClient,
  ) {
        this.config = AppConfigService.settings;
        this.baseUrl = this.config.apiServer.authAPI;
  }

  register(user: User) {
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }

  login(creds: Credential) {
        console.log(creds);
        console.log(this.config);
        return this.http.post<any>(`${this.baseUrl}/auth/login`, creds)
        .pipe(map(user => {
            // console.log(user);
            // login successful if there's a jwt token in the response
            if (user && user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // this.setSession(user);
                // console.log(user.email);
                const obj = JSON.stringify({email: user.email});
                console.log(obj);
                const base = CryptoJS.AES.encrypt(
                            obj,
                            this.config.authentication.rsa.privateKey)
                        .toString();

                const e64 = CryptoJS.enc.Base64.parse(base);
                const cipher = e64.toString(CryptoJS.enc.Hex);
                return cipher;
            } else {
                return null;
            }
        }));
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');
        authResult.expiresAt = expiresAt;
        console.log(authResult);
        localStorage.setItem('currentUser', JSON.stringify(authResult));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }


}
