import { Injectable } from '@angular/core';
import Home from '../Models/Home';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'http://localhost:5234/api/usuario'; // URL de tu API

  constructor(private http: HttpClient) {}

  GetUsuer(): Observable<Home[]> {
    return this.http.get<Home[]>(this.apiUrl);
  }
}
