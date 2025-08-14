import { Component, ChangeDetectionStrategy, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Oficial } from '../../interface/Oficial';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabla-oficiales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla-oficiales.html',
  styleUrls: ['./tabla-oficiales.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaOficiales {

  oficiales = signal<Oficial[]>([]);
  nombre = signal('');
  rango = signal('');
  pais = signal('');

  constructor(private http: HttpClient) {
    this.cargarOficiales();
  }

  cargarOficiales() {
    this.http.get<Oficial[]>('assets/policias.json').subscribe({
      next: (data) => this.oficiales.set(data),
      error: (err) => console.error('Error al cargar oficiales:', err),
    });
  }
  oficialesFiltrados = computed(() => {
    const n = this.nombre().trim().toLowerCase();
    const r = this.rango().trim().toLowerCase();
    const p = this.pais().trim().toLowerCase();

    return this.oficiales().filter(of =>
      of.nombre.toLowerCase().includes(n) &&
      of.rango.toLowerCase().includes(r) &&
      of.pais.toLowerCase().includes(p)
    );
  });


  onNombreChange(valor: string) {
    this.nombre.set(valor);
  }

  onRangoChange(valor: string) {
    this.rango.set(valor);
  }

  onPaisChange(valor: string) {
    this.pais.set(valor);
  }

  trackByNombre( oficial: Oficial): string {
  return oficial.nombre;
}
}
