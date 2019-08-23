import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  constructor(private http: HttpClient) { }

  createLead(payload) {
    return this.http.post(`${BASE_URL}/createLead`, payload);
  }

  getLeadsList(sort, offset, limit) {
    return this.http.get(`${BASE_URL}/listLeads?sortby=${sort}&offset=${offset}&limit=${limit}`);
  }

  getLeadDetails(payload) {
    return this.http.post(`${BASE_URL}/leadDetails`, payload);
  }
}
