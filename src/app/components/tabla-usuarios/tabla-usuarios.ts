import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../interface/usuario';
import { RegistroService } from '../../service/registro';

@Component({
  selector: 'app-tabla-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla-usuarios.html',
  styleUrls: ['./tabla-usuarios.css']
})
export class TablaUsuarios implements OnInit {
  usuarios: Usuario[] = [];
  loading = false;

  editId: number | null = null;
  editBuffer: Partial<Usuario> = {};

  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' = 'success';

  confirmDeleteId: number | null = null;
  showDeleteConfirm = false;

  constructor(
    private registroService: RegistroService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.loading = true;
    this.cdRef.detectChanges(); 

    this.registroService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.loading = false;
        this.cdRef.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdRef.detectChanges(); 
        this.openModal('Error', 'No se pudieron cargar los usuarios.', 'error');
      }
    });
  }

  iniciarEdicion(usuario: Usuario) {
    this.editId = usuario.id!;
    this.editBuffer = { ...usuario };
  }

  cancelarEdicion() {
    this.editId = null;
    this.editBuffer = {};
  }

  guardarEdicion() {
    if (this.editId == null) return;

    this.registroService.actualizarUsuario(this.editId, this.editBuffer as Usuario).subscribe({
      next: () => {
        this.openModal('Éxito', 'Usuario actualizado correctamente.', 'success');
        this.cancelarEdicion();
        this.cargarUsuarios();
      },
      error: () => {
        this.openModal('Error', 'No se pudo actualizar el usuario.', 'error');
      }
    });
  }

  pedirEliminar(id: number) {
    this.confirmDeleteId = id;
    this.showDeleteConfirm = true;
  }

  cancelarEliminar() {
    this.confirmDeleteId = null;
    this.showDeleteConfirm = false;
  }

  confirmarEliminar() {
    if (this.confirmDeleteId == null) return;

    this.registroService.eliminarUsuario(this.confirmDeleteId).subscribe({
      next: () => {
        this.openModal('Éxito', 'Usuario eliminado correctamente.', 'success');
        this.cargarUsuarios();
        this.cancelarEliminar();
      },
      error: () => {
        this.openModal('Error', 'No se pudo eliminar el usuario.', 'error');
        this.cancelarEliminar();
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
