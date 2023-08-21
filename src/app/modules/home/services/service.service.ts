import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }
      
  getTotalDepartments(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/Department/count-actives`, this.httpOptions);
  }
      
  getTotalUsers(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/User/count-actives`, this.httpOptions);
  }
      
  getTotalLegalPeople(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/LegalPerson/count-actives`, this.httpOptions);
  }
      
  getTotalPhysicalPeople(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/PhysicalPerson/count-actives`, this.httpOptions);
  }
}
