import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, debounceTime, startWith } from 'rxjs/operators';

interface Oficial {
  nombre: string;
  rango: string;
  pais: string;
  especialidad: string;
  foto: string;
}

@Component({
  selector: 'app-tabla-oficiales',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './tabla-oficiales.html',
  styleUrls: ['./tabla-oficiales.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablaOficiales {
  private oficialesSubject = new BehaviorSubject<Oficial[]>([]);
  oficiales$ = this.oficialesSubject.asObservable();

  // filtros como subjects para poder combinarlos
  private nombreFilter$ = new BehaviorSubject<string>('');
  private rangoFilter$ = new BehaviorSubject<string>('');
  private paisFilter$ = new BehaviorSubject<string>('');

  // resultado filtrado observable
  oficialesFiltrados$!: Observable<Oficial[]>;

  // valores vinculados a los inputs (two-way)
  nombre: string = '';
  rango: string = '';
  pais: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Oficial[]>('assets/policias.json').subscribe({
      next: data => {
        this.oficialesSubject.next(data);
      },
      error: err => {
        console.error('Error al cargar oficiales:', err);
      }
    });

    // Combinar filtros y lista, con debounce para los inputs
    this.oficialesFiltrados$ = combineLatest([
      this.oficiales$,
      this.nombreFilter$.pipe(debounceTime(150), startWith('')),
      this.rangoFilter$.pipe(debounceTime(150), startWith('')),
      this.paisFilter$.pipe(debounceTime(150), startWith(''))
    ]).pipe(
      map(([oficiales, nombre, rango, pais]) => {
        const n = nombre.trim().toLowerCase();
        const r = rango.trim().toLowerCase();
        const p = pais.trim().toLowerCase();
        return oficiales.filter(of =>
          of.nombre.toLowerCase().includes(n) &&
          of.rango.toLowerCase().includes(r) &&
          of.pais.toLowerCase().includes(p)
        );
      })
    );
  }

  // Métodos que actualizan los filtros (se usan en ngModelChange)
  onNombreChange(val: string) {
    this.nombreFilter$.next(val);
  }
  onRangoChange(val: string) {
    this.rangoFilter$.next(val);
  }
  onPaisChange(val: string) {
    this.paisFilter$.next(val);
  }

  trackByNombre(index: number, oficial: Oficial) {
    return oficial.nombre; // asume nombre único; si no lo es, combina con país/rango
  }
}
