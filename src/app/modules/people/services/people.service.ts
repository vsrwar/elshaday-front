import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressRequest } from 'src/app/models/requests/address.request';
import { LegalPersonRequest } from 'src/app/models/requests/legal-person.request';
import { PhysicalPersonRequest } from 'src/app/models/requests/physical-person.request';
import { LegalPersonResponse } from 'src/app/models/responses/legal-person.response';
import { PhysicalPersonResponse } from 'src/app/models/responses/physical-person.response';
import { Paged } from 'src/app/models/utils/paged.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }
    // Http Headers
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  
    baseLegalPersonUrl = `${environment.apiUrl}/LegalPerson`;
    basePhysicalPersonUrl = `${environment.apiUrl}/PhysicalPerson`;
    baseViaCepUrl = `${environment.viaCepUrl}`;

    getAddressesByCep(cep: string): Observable<AddressRequest> {
      return this.http
        .get<AddressRequest>(`${this.baseViaCepUrl}/${cep}/json/`);
    }

    // For Physical person
    createPhysicalPerson(request: PhysicalPersonRequest): Observable<PhysicalPersonResponse> {
      return this.http
        .post<PhysicalPersonResponse>(this.basePhysicalPersonUrl, request, this.httpOptions);
    }
      
    getPhysicalPerson(id: number): Observable<PhysicalPersonResponse> {
      return this.http
        .get<PhysicalPersonResponse>(`${this.basePhysicalPersonUrl}/${id}`, this.httpOptions);
    }
      
    getPhysicalPeople(page: number = 1, pageSize: number = 25): Observable<Paged<PhysicalPersonResponse>> {
      return this.http
        .get<Paged<PhysicalPersonResponse>>(`${this.basePhysicalPersonUrl}?page=${page}&pageSize=${pageSize}`, this.httpOptions);
    }
    
    updatePhysicalPerson(request: PhysicalPersonRequest): Observable<PhysicalPersonResponse> {
      return this.http
        .put<PhysicalPersonResponse>(this.basePhysicalPersonUrl, request, this.httpOptions);
    }
      
    deletePhysicalPerson(id: number): Observable<any> {
      return this.http
        .delete<any>(`${this.basePhysicalPersonUrl}/${id}`, this.httpOptions);
    }

    // For legal person
    createLegalPerson(request: LegalPersonRequest): Observable<LegalPersonResponse> {
      return this.http
        .post<LegalPersonResponse>(this.baseLegalPersonUrl, request, this.httpOptions);
    }
      
    getLegalPerson(id: number): Observable<LegalPersonResponse> {
      return this.http
        .get<LegalPersonResponse>(`${this.baseLegalPersonUrl}/${id}`, this.httpOptions);
    }
      
    getLegalPeople(page: number = 1, pageSize: number = 25): Observable<Paged<LegalPersonResponse>> {
      return this.http
        .get<Paged<LegalPersonResponse>>(`${this.baseLegalPersonUrl}?page=${page}&pageSize=${pageSize}`, this.httpOptions);
    }
    
    updateLegalPerson(request: LegalPersonRequest): Observable<LegalPersonResponse> {
      return this.http
        .put<LegalPersonResponse>(this.baseLegalPersonUrl, request, this.httpOptions);
    }
      
    deleteLegalPerson(id: number): Observable<any> {
      return this.http
        .delete<any>(`${this.baseLegalPersonUrl}/${id}`, this.httpOptions);
    }
}
