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
  categoria = '';
  descripcion = '';
  callePrincipal = '';
  calleSecundaria = '';
  referenciaVisible = '';
  fecha = '';
  denunciante = '';
  mensajeExito = '';
  error = '';
  modalVisible = false;
  cargando = false;

  constructor(private authDenuncia: AuthDenuncia, private cd: ChangeDetectorRef) {
    const usuarioNombre = localStorage.getItem('usuarioNombre'); // Cambia esta clave si usas otra
    if (usuarioNombre) {
      this.denunciante = usuarioNombre;
    }
  }

  enviarDenuncia() {
    if (this.cargando) return;

    this.error = '';
    this.mensajeExito = '';

    if (!this.categoria || !this.descripcion || !this.callePrincipal || !this.calleSecundaria || !this.referenciaVisible || !this.fecha || !this.denunciante) {
      this.error = 'Por favor, complete todos los campos.';
      return;
    }

    this.cargando = true;

    const nuevaDenuncia: Denuncia = {
      categoria: this.categoria,
      descripcion: this.descripcion,
      callePrincipal: this.callePrincipal,
      calleSecundaria: this.calleSecundaria,
      referenciaVisible: this.referenciaVisible,
      fecha: this.fecha,
      denunciante: this.denunciante,
      estado: 'PENDIENTE'
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
    this.categoria = '';
    this.descripcion = '';
    this.callePrincipal = '';
    this.calleSecundaria = '';
    this.referenciaVisible = '';
    this.fecha = '';
  }

  abrirModal() {
    this.modalVisible = true;
    this.cd.markForCheck();
    setTimeout(() => {
      this.cerrarModal();
      this.cd.markForCheck();
    }, 3000);
  }

  cerrarModal() {
    this.modalVisible = false;
    this.mensajeExito = '';
  }
}
