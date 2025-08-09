import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { UsuarioConId } from '../../interface/usuario';



@Component({
  selector: 'app-tabla-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule,  HttpClientModule],
  templateUrl: './tabla-usuarios.html',
  styleUrls: ['./tabla-usuarios.css']
})
export class TablaUsuarios {
  private API_FIREBASE = 'https://proyectoapp-b0489-default-rtdb.firebaseio.com';

  private usuariosSubject = new BehaviorSubject<UsuarioConId[]>([]);
  usuarios$ = this.usuariosSubject.asObservable();

  loading = false;

  editId: string | null = null;
  editBuffer: Partial<UsuarioConId> = {};

  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' = 'success';

  confirmDeleteId: string | null = null;
  showDeleteConfirm = false;

  constructor(private http: HttpClient) {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true;
    this.http.get<Record<string, UsuarioConId>>(`${this.API_FIREBASE}/usuarios.json`)
      .pipe(
        map(obj => {
          if (!obj) return [];
          return Object.entries(obj).map(([id, data]) => ({ id, ...data as Omit<UsuarioConId, 'id'> }));
        })
      )
      .subscribe({
        next: (list) => {
          this.usuariosSubject.next(list);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.openModal('Error', 'No se pudieron cargar los usuarios.', 'error');
        }
      });
  }

  iniciarEdicion(usuario: UsuarioConId) {
    this.editId = usuario.id;
    this.editBuffer = JSON.parse(JSON.stringify(usuario));
  }

  cancelarEdicion() {
    this.editId = null;
    this.editBuffer = {};
  }

  guardarEdicion() {
    if (!this.editId) return;

    this.http.put(`${this.API_FIREBASE}/usuarios/${this.editId}.json`, this.editBuffer)
      .subscribe({
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

    this.http.delete(`${this.API_FIREBASE}/usuarios/${this.confirmDeleteId}.json`)
      .subscribe({
        next: () => {
          this.openModal('Éxito', 'Usuario eliminado correctamente.', 'success');
          this.showDeleteConfirm = false;
          this.confirmDeleteId = null;
          this.cargarUsuarios();
        },
        error: () => {
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