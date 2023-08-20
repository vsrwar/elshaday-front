import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEditRequest } from 'src/app/models/requests/user.edit.request';
import { UserRequest } from 'src/app/models/requests/user.request';
import { UserResponse } from 'src/app/models/responses/user.response';
import { Paged } from 'src/app/models/utils/paged.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json; x-api-version=1',
    }),
  };

  baseUrl = `${environment.apiUrl}/User`;

  createUser(request: UserRequest): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(this.baseUrl, request, this.httpOptions);
  }
    
  getUser(id: number): Observable<UserResponse> {
    return this.http
      .get<UserResponse>(`${this.baseUrl}/${id}`, this.httpOptions);
  }
    
  getUsers(page: number = 1, pageSize: number = 25): Observable<Paged<UserResponse>> {
    return this.http
      .get<Paged<UserResponse>>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`, this.httpOptions);
  }
  
  updateUser(request: UserEditRequest): Observable<UserResponse> {
    return this.http
      .put<UserResponse>(this.baseUrl, request, this.httpOptions);
  }
    
  deleteUser(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  activateUser(id: number): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/activate/${id}`, this.httpOptions);
  }
  deactivateUser(id: number): Observable<any>  {
    return this.http
      .post<any>(`${this.baseUrl}/deactivate/${id}`, this.httpOptions);
  }
}
