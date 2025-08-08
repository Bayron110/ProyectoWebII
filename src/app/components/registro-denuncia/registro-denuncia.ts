import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthDenuncia } from '../../service/auth-denuncia';
import { Denuncia } from '../../interface/denuncia';

@Component({
  selector: 'app-registro-denuncia',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro-denuncia.html',
  styleUrls: ['./registro-denuncia.css']
})
export class RegistroDenuncia {
  denunciante = '';
  fecha = '';
  descripcion = '';
  lugar = '';

  mensajeExito = '';
  error = '';

  modalVisible = false;
  cargando = false;

  constructor(private authDenuncia: AuthDenuncia) {}

  enviarDenuncia() {
    if (this.cargando) return;

    this.error = '';
    this.mensajeExito = '';

    if (!this.denunciante || !this.fecha || !this.descripcion || !this.lugar) {
      this.error = 'Por favor, complete todos los campos.';
      return;
    }

    this.cargando = true;

    const nuevaDenuncia: Denuncia = {
      denunciante: this.denunciante,
      fecha: this.fecha,
      descripcion: this.descripcion,
      lugar: this.lugar,
      estado: 'pendiente'
    };

    this.authDenuncia.guardarDenuncia(nuevaDenuncia).subscribe({
      next: () => {
        this.limpiarCampos();
        this.cargando = false;
        this.mensajeExito = 'Denuncia registrada correctamente.';
        this.abrirModal();
      },
      error: (err) => {
        this.cargando = false;
        this.error = err?.error?.message || 'Error al guardar la denuncia. Intente más tarde.';
      }
    });
  }

  limpiarCampos() {
    this.denunciante = '';
    this.fecha = '';
    this.descripcion = '';
    this.lugar = '';
  }

  abrirModal() {
    this.modalVisible = true;
    // Cierra modal automáticamente después de 3 segundos
    setTimeout(() => this.cerrarModal(), 3000);
  }

  cerrarModal() {
    this.modalVisible = false;
    this.mensajeExito = '';
  }
}
