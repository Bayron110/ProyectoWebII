import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Denuncia } from '../interface/denuncia';



@Injectable({
  providedIn: 'root'
})
export class AuthDenuncia {
  private API_FIREBASE = 'https://proyectoapp-b0489-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) {}

  guardarDenuncia(denuncia: Denuncia): Observable<any> {
    return this.http.post(`${this.API_FIREBASE}/denuncias.json`, denuncia);
  }

  obtenerDenuncias(): Observable<Denuncia[]> {
    return this.http.get<Record<string, Denuncia>>(`${this.API_FIREBASE}/denuncias.json`)
      .pipe(
        map(obj => {
          if (!obj) return [];
          return Object.entries(obj).map(([id, data]) => ({ id, ...data }));
        })
      );
  }

  obtenerDenuncia(id: string): Observable<Denuncia> {
    return this.http.get<Denuncia>(`${this.API_FIREBASE}/denuncias/${id}.json`);
  }

  actualizarDenuncia(id: string, data: Partial<Denuncia>): Observable<any> {
    return this.http.patch(`${this.API_FIREBASE}/denuncias/${id}.json`, data);
  }

  eliminarDenuncia(id: string): Observable<any> {
    return this.http.delete(`${this.API_FIREBASE}/denuncias/${id}.json`);
  }
}
