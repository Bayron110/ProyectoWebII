import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthDenuncia } from '../../service/auth-denuncia';
import { Denuncia } from '../../interface/denuncia';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-boton-panico',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './boton-panico.html',
  styleUrls: ['./boton-panico.css']
})
export class BotonPanicoComponent {
  mostrarModal = false;
  fecha = '';
  lugar = '';
  descripcion = '';
  cargando = false;
  mensajeExito = '';
  error = '';

  constructor(private authDenuncia: AuthDenuncia) { }

  abrirModalDenuncia(): void {
    this.fecha = new Date().toISOString().slice(0, 10);
    this.mostrarModal = true;
    this.error = '';
    this.mensajeExito = '';
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.lugar = '';
    this.descripcion = '';
    this.error = '';
    this.cargando = false;
  }

  enviarDenuncia(): void {
    if (this.cargando) return;
    if (!this.validarCampos()) {
      this.error = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    this.cargando = true;
    this.error = '';

    const denunciaAnonima: Denuncia = {
      denunciante: 'Anónimo',
      fecha: this.fecha,
      descripcion: this.descripcion.trim(),
      lugar: this.lugar.trim(),
      estado: 'pendiente'
    };

    this.authDenuncia.guardarDenuncia(denunciaAnonima)
      .pipe(
        finalize(() => this.cargando = false)
      )
      .subscribe({
        next: () => this.mostrarExitoYcerrar(),
        error: (err) => this.mostrarError(err)
      });
  }

  private validarCampos(): boolean {
    return !!this.fecha &&
      !!this.descripcion?.trim() &&
      !!this.lugar?.trim();
  }

  private mostrarExitoYcerrar(): void {
    this.mensajeExito = 'Denuncia registrada correctamente';
    setTimeout(() => {
      this.cerrarModal();
      this.mensajeExito = '';
    }, 100);
  }

  private mostrarError(err: any): void {
    this.error = err?.message ||
      err?.error?.message ||
      'Error al enviar la denuncia. Por favor intente nuevamente.';
    console.error('Error en denuncia:', err);
  }
}