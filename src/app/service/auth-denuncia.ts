import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Denuncia } from '../interface/denuncia';

@Injectable({
  providedIn: 'root'
})
export class AuthDenuncia {
  private API_URL = 'http://localhost:8080/api/denuncias';

  constructor(private http: HttpClient) {}

  guardarDenuncia(denuncia: Denuncia): Observable<Denuncia> {
    return this.http.post<Denuncia>(this.API_URL, denuncia);
  }

  obtenerDenuncias(): Observable<Denuncia[]> {
    return this.http.get<Denuncia[]>(this.API_URL);
  }

  obtenerDenuncia(id: string): Observable<Denuncia> {
    return this.http.get<Denuncia>(`${this.API_URL}/${id}`);
  }

  actualizarDenuncia(id: string, data: Partial<Denuncia>): Observable<Denuncia> {
    return this.http.put<Denuncia>(`${this.API_URL}/${id}`, data);
  }

  eliminarDenuncia(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
