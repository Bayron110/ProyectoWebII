import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface AuthResponse {
  success: boolean;
  rol?: 'ADMIN' | 'USUARIO';
  nombre?: string;
  id?: string;
  mensaje?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}
  

  login(correoE: string, contrasena: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, { correoE, contrasena }).pipe(
      map(res => {
        if (res.success) {
          localStorage.setItem('usuarioLogueado', 'true');
          localStorage.setItem('usuarioNombre', res.nombre!);
          localStorage.setItem('usuarioRol', res.rol!);
          if (res.id) localStorage.setItem('usuarioId', res.id);
        }
        return res;
      }),
      catchError(() => of({ success: false, mensaje: 'Error al conectar con el servidor' }))
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioRol');
    localStorage.setItem('usuarioLogueado', 'false');
  }

  estaLogueado(): boolean {
    return localStorage.getItem('usuarioLogueado') === 'true';
  }

  getRol(): 'ADMIN' | 'USUARIO' | null {
    return (localStorage.getItem('usuarioRol') as 'ADMIN' | 'USUARIO') || null;
  }
  esUsuario(): boolean {
  return this.getRol() === 'USUARIO';
}

esAdmin(): boolean {
  return this.getRol() === 'ADMIN';
}
}
