import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Registro {
  private API_FIREBASE = 'https://proyectoapp-b0489-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient){}


  guardarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.API_FIREBASE}/usuarios.json`, usuario);
  }

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<Record<string, any>>(`${this.API_FIREBASE}/usuarios.json`)
      .pipe(
        map(obj => {
          if (!obj) return [];
          return Object.entries(obj).map(([id, data]) => ({ id, ...data }));
        })
      );
  }

  obtenerUsuario(id: string): Observable<any> {
    return this.http.get(`${this.API_FIREBASE}/usuarios/${id}.json`);
  }

  actualizarUsuario(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.API_FIREBASE}/usuarios/${id}.json`, data);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.API_FIREBASE}/usuarios/${id}.json`);
  }
}
