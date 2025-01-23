import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/files`);
  }

  predict(filePath: string): Observable<any> {
    const data = { filepath: filePath };
    return this.http.post<any>(`${this.apiUrl}/predict`, data);
  }

  getResult(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/result`, data);
  }

  statistic(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/statistic`, data);
  }
}
