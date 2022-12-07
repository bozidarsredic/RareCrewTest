import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';





@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private http: HttpClient) { }

  getEmployees() : Observable<Employee[]> {

    return this.http.get<Employee[]>(environment.URL);
  }
}
