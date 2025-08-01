import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Registro {
  private API_FIREBASE = 'https://proyectoapp-b0489-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient){}

  // Crear
  guardarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.API_FIREBASE}/usuarios.json`, usuario);
  }

  // Leer todos (devuelve arreglo con los IDs incluidos)
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<Record<string, any>>(`${this.API_FIREBASE}/usuarios.json`)
      .pipe(
        map(obj => {
          if (!obj) return [];
          return Object.entries(obj).map(([id, data]) => ({ id, ...data }));
        })
      );
  }

  // Leer uno por ID
  obtenerUsuario(id: string): Observable<any> {
    return this.http.get(`${this.API_FIREBASE}/usuarios/${id}.json`);
  }

  // Actualizar parcialmente (puedes usar PUT si reemplazas todo)
  actualizarUsuario(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.API_FIREBASE}/usuarios/${id}.json`, data);
  }

  // Eliminar
  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.API_FIREBASE}/usuarios/${id}.json`);
  }
}
