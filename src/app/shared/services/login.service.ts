import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL } from '../constants/app.constants';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    console.log("URL ", BASE_URL)
  }

  login(payload) {
    return this.http.post(`${BASE_URL}/login/verify`, payload);
  }

  logout(payload) {
    return this.http.post(`${BASE_URL}/logout`, payload);
  }
}
