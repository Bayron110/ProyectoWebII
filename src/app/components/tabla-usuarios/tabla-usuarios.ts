import { Component, OnInit } from '@angular/core';
import { Registro } from '../../service/registro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UsuarioConId {
  id: string;
  nombre?: string;
  apellido?: string;
  cedula?: string;
  direccion?: string;
  email?: string;
  password?: string;
  // cualquier otro campo
}

@Component({
  selector: 'app-tabla-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla-usuarios.html',
  styleUrls: ['./tabla-usuarios.css']
})
export class TablaUsuarios implements OnInit {
  usuarios: UsuarioConId[] = [];
  loading = false;

  editId: string | null = null;
  editBuffer: Partial<UsuarioConId> = {};

  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' = 'success';

  confirmDeleteId: string | null = null;
  showDeleteConfirm = false;

  constructor(private usuario1: Registro) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true;
    this.usuario1.obtenerUsuarios().subscribe({
      next: (list) => {
        this.usuarios = list;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
        this.loading = false;
        this.openModal('Error', 'No se pudieron cargar los usuarios.', 'error');
      }
    });
  }

  iniciarEdicion(usuario: UsuarioConId) {
    this.editId = usuario.id;
    this.editBuffer = { ...usuario };
  }

  cancelarEdicion() {
    this.editId = null;
    this.editBuffer = {};
  }

  guardarEdicion() {
    if (!this.editId) return;
    const toUpdate = { ...this.editBuffer };
    this.usuario1.actualizarUsuario(this.editId, toUpdate).subscribe({
      next: () => {
        this.openModal('Éxito', 'Usuario actualizado correctamente.', 'success');
        this.editId = null;
        this.editBuffer = {};
        this.cargarUsuarios();
      },
      error: (err) => {
        console.error('Error actualizando usuario', err);
        this.openModal('Error', 'No se pudo actualizar el usuario.', 'error');
      }
    });
  }

  pedirEliminar(id: string) {
    this.confirmDeleteId = id;
    this.showDeleteConfirm = true;
  }

  cancelarEliminar() {
    this.confirmDeleteId = null;
    this.showDeleteConfirm = false;
  }

  confirmarEliminar() {
    if (!this.confirmDeleteId) return;
    this.usuario1.eliminarUsuario(this.confirmDeleteId).subscribe({
      next: () => {
        this.openModal('Éxito', 'Usuario eliminado correctamente.', 'success');
        this.showDeleteConfirm = false;
        this.confirmDeleteId = null;
        this.cargarUsuarios();
      },
      error: (err) => {
        console.error('Error eliminando usuario', err);
        this.openModal('Error', 'No se pudo eliminar el usuario.', 'error');
        this.showDeleteConfirm = false;
      }
    });
  }

  openModal(title: string, message: string, type: 'success' | 'error') {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = type;
    this.showModal = true;
    if (type === 'success') {
      setTimeout(() => this.closeModal(), 3000);
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
