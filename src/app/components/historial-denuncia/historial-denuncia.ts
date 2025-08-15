import {Component, OnInit, OnDestroy, ChangeDetectorRef,ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Denuncia } from '../../interface/denuncia';
import { AuthDenuncia } from '../../service/auth-denuncia';

@Component({
  selector: 'app-historial-denuncia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-denuncia.html',
  styleUrls: ['./historial-denuncia.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistorialDenuncia implements OnInit, OnDestroy {
  private denunciasSubject = new BehaviorSubject<Denuncia[]>([]);
  denuncias$ = this.denunciasSubject.asObservable();

  cargando = false;
  error = '';
  private pollingSub?: Subscription;

  constructor(private authDenuncia: AuthDenuncia, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarDenuncias();
    this.iniciarPolling();
  }

  ngOnDestroy(): void {
    this.pollingSub?.unsubscribe();
  }

  cargarDenuncias(): void {
    this.cargando = true;
    this.error = '';

    const usuarioNombre = localStorage.getItem('usuarioNombre');
    if (!usuarioNombre || usuarioNombre.trim() === '') {
      this.error = 'Usuario no autenticado';
      this.denunciasSubject.next([]);
      this.cargando = false;
      this.cd.markForCheck();
      return;
    }

    this.authDenuncia.obtenerDenuncias().subscribe({
      next: (data) => {
        // Filtrar denuncias para que solo se muestren las del usuario logueado
        const filtradas = data.filter(d => d.denunciante === usuarioNombre);
        this.denunciasSubject.next(filtradas);
        this.cargando = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        this.error = 'Error al cargar denuncias.';
        console.error(err);
        this.cargando = false;
        this.cd.markForCheck();
      }
    });
  }

  private iniciarPolling(): void {
    this.pollingSub = interval(5000).pipe(
      switchMap(() => this.authDenuncia.obtenerDenuncias())
    ).subscribe({
      next: (data) => {
        const usuarioNombre = localStorage.getItem('usuarioNombre');
        if (usuarioNombre && usuarioNombre.trim() !== '') {
          const filtradas = data.filter(d => d.denunciante === usuarioNombre);
          this.denunciasSubject.next(filtradas);
        } else {
          this.denunciasSubject.next([]);
        }
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Error en actualización automática:', err);
      }
    });
  }
}
