import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Panico } from '../interface/DenunciaRapida';



@Injectable({
  providedIn: 'root'
})
export class AuthPanico {

  private apiUrl = 'http://localhost:8080/api/panico';

  constructor(private http: HttpClient) {}


  crearPanico(panico: Panico): Observable<Panico> {
    return this.http.post<Panico>(this.apiUrl, panico);
  }


  obtenerPanicos(): Observable<Panico[]> {
    return this.http.get<Panico[]>(this.apiUrl);
  }

  obtenerPanicoPorId(id: number): Observable<Panico> {
    return this.http.get<Panico>(`${this.apiUrl}/${id}`);
  }

  eliminarPanico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  actualizarPanico(id: number, panico: Panico): Observable<Panico> {
    return this.http.put<Panico>(`${this.apiUrl}/${id}`, panico);
  }
}
