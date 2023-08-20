import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentForLegalPersonRequest } from 'src/app/models/requests/department-for-legal-person.request';
import { DepartmentForPhysicalPersonRequest } from 'src/app/models/requests/department-for-physical-person.request';
import { DepartmentResponse } from 'src/app/models/responses/department.response';
import { Paged } from 'src/app/models/utils/paged.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  baseUrl = `${environment.apiUrl}/Department`;

  constructor(private http: HttpClient) { }

  createDepartmentForLegalPerson(request: DepartmentForLegalPersonRequest): Observable<DepartmentResponse> {
    return this.http
      .post<DepartmentResponse>(`${this.baseUrl}/for-legal-person`, request, this.httpOptions);
  }
  
  createDepartmentForPhysicalPerson(request: DepartmentForPhysicalPersonRequest): Observable<DepartmentResponse> {
    return this.http
      .post<DepartmentResponse>(`${this.baseUrl}/for-physical-person`, request, this.httpOptions);
  }
    
  getDepartment(id: number): Observable<DepartmentResponse> {
    return this.http
      .get<DepartmentResponse>(`${this.baseUrl}/${id}`, this.httpOptions);
  }
    
  getDepartments(page: number = 1, pageSize: number = 25): Observable<Paged<DepartmentResponse>> {
    return this.http
      .get<Paged<DepartmentResponse>>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`, this.httpOptions);
  }
  
  updateDepartmentForLegalPerson(request: DepartmentForLegalPersonRequest): Observable<DepartmentResponse> {
    return this.http
      .put<DepartmentResponse>(`${this.baseUrl}/for-legal-person`, request, this.httpOptions);
  }
  
  updateDepartmentForPhysicalPerson(request: DepartmentForPhysicalPersonRequest): Observable<DepartmentResponse> {
    return this.http
      .put<DepartmentResponse>(`${this.baseUrl}/for-physical-person`, request, this.httpOptions);
  }
    
  deleteDepartment(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/${id}`, this.httpOptions);
  }
}
