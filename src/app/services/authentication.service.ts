import { ElementSchemaRegistry } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  auth() {
    if (window.localStorage.getItem('user')) {
      return true;
    }
    return false;
  }
}
