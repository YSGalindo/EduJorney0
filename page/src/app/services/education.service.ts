import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any> {
    const resp = `${this.apiUrl}/cursos`; // Reemplaza 'datos' con tu endpoint real
    return this.http.get(resp);
  }

  obtenerDatosIns(): Observable<any> {
    const resp = `${this.apiUrl}/instituciones`; // Reemplaza 'datos' con tu endpoint real
    return this.http.get(resp);
  }

  obtenerCursos(): Observable<any> {
    const resp = `${this.apiUrl}/cursos`; // Reemplaza 'datos' con tu endpoint real
    return this.http.get(resp);
  }
}
