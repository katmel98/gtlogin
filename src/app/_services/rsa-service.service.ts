import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class RsaServiceService {

  private config;
  private privateKey: string;
  private publicKey: string;
  private enabled: boolean;

  constructor() {
    this.config = AppConfigService.settings;

    this.privateKey = this.config.authentication.rsa.privateKey;
    this.publicKey = this.config.authentication.rsa.publicKey;
    this.enabled = this.config.authentication.rsa.enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  encrypt(plaintext: string): string {
    if (!this.enabled) {
      return plaintext;
    }

    const encrypted = crypto.AES.encrypt(this.privateKey, plaintext);

    console.log(encrypted.toString());

    return encrypted.toString();
  }

  decrypt(cypher: string): string {
    if (!this.enabled) {
      return cypher;
    }

    const plaintext = crypto.AES.decrypt(this.publicKey, cypher);

    console.log(plaintext.toString(crypto.enc.Utf8));

    return plaintext.toString(crypto.enc.Utf8);
  }
}
