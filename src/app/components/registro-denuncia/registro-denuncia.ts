import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthDenuncia } from '../../service/auth-denuncia';
import { Denuncia } from '../../interface/denuncia';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-denuncia',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  constructor(private authDenuncia: AuthDenuncia, private cd: ChangeDetectorRef) {}

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
  this.cd.markForCheck(); 
  setTimeout(() => {
    this.cerrarModal();
    this.cd.markForCheck();
  }, 30000);
}


  cerrarModal() {
    this.modalVisible = false;
    this.mensajeExito = '';
  }
}
