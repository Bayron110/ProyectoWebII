import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { AuthPanico } from '../../service/auth-panico';
import { Panico } from '../../interface/DenunciaRapida';

@Component({
  selector: 'app-boton-panico',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './boton-panico.html',
  styleUrls: ['./boton-panico.css']
})
export class BotonPanicoComponent {
  mensaje: string = '';
  error: string = '';
  mensajeExito: string = '';
  cargando: boolean = false;
  mostrarModal: boolean = false;

  fecha: string = '';
  lugar: string = '';

  constructor(private authPanico: AuthPanico) {}

  abrirModalDenuncia(): void {
    this.mostrarModal = true;
    this.mensajeExito = '';
    this.error = '';
    this.fecha = new Date().toISOString().split('T')[0];
    this.lugar = '';
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.fecha = '';
    this.lugar = '';
    this.mensajeExito = '';
    this.error = '';
  }

  enviarDenuncia(): void {
    this.error = '';
    this.mensajeExito = '';
    this.cargando = true;

    const panico: Panico = {
      fecha: new Date(this.fecha).toISOString(),
      lugar: this.lugar,
      estado: 'ACTIVO',
      denunciante: 'Usuario Anónimo'
    };

    this.authPanico.crearPanico(panico)
      .pipe(finalize(() => this.cargando = false))
      .subscribe({
        next: () => {
          this.mensajeExito = '¡Denuncia anónima enviada exitosamente!';
          setTimeout(() => {
            this.cerrarModal();
            this.mensajeExito = '';
          }, 2000);
        },
        error: (err) => {
          console.error(err);
          this.error = 'Error al enviar la denuncia. Intenta nuevamente.';
          setTimeout(() => this.error = '', 9000);
        }
      });
  }
}