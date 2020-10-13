import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../../interfaces/auths';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://192.168.1.197:3000/api';

  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  logIn(data){
    return this.http.post<Auth >(this.baseUrl + '/signin', data)
  }

  logUp(data){
    return this.http.post<Auth >(this.baseUrl + '/signup', data)
  }
}