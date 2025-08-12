import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface Denuncia {
  id?: string;
  nombre?: string;
  descripcion: string;
  fecha: string;
  estado: string;
}

@Component({
  selector: 'app-historial-denuncia',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './historial-denuncia.html',
  styleUrls: ['./historial-denuncia.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistorialDenuncia {
  private API_FIREBASE = 'https://proyectoapp-b0489-default-rtdb.firebaseio.com';
  private denunciasSubject = new BehaviorSubject<Denuncia[]>([]);
  denuncias$ = this.denunciasSubject.asObservable();

  constructor(private http: HttpClient) {
    this.http.get<Record<string, any>>(`${this.API_FIREBASE}/denuncias.json`)
      .pipe(
        map(obj => {
          if (!obj) return [];
          return Object.entries(obj).map(([id, data]) => ({
            id,
            nombre: data.nombre || data.denunciante || 'No especificado',
            descripcion: data.descripcion,
            fecha: data.fecha,
            estado: data.estado
          }));
        })
      )
      .subscribe({
        next: data => this.denunciasSubject.next(data),
        error: err => console.error('Error al cargar denuncias:', err)
      });
  }
}
