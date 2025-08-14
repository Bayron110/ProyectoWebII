import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Usuario } from '../../interface/usuario';
import { RegistroService } from '../../service/registro';

interface FlipCard {
  title: string;
  frontIcon: string;
  frontText: string;
  backTitle: string;
  backContent: string[];
  flipped: boolean;
}

@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-registro.html',
  styleUrls: ['./formulario-registro.css']
})
export class FormularioRegistro {
  backgroundImageUrl = 'https://via.placeholder.com/1600x900';

  cards: FlipCard[] = [
    {
      title: 'Trabaja con nosotros',
      frontIcon: 'fas fa-briefcase',
      frontText: '¿Quieres trabajar con nosotros?',
      backTitle: 'Requisitos',
      backContent: [
        'Experiencia mínima de 1 año',
        'Conocimientos en Angular y TypeScript',
        'Buena comunicación',
        'Enviar CV a: empleo@tuempresa.com'
      ],
      flipped: false
    },
    {
      title: 'Únete al equipo',
      frontIcon: 'fas fa-handshake',
      frontText: 'Sé parte de la familia',
      backTitle: 'Beneficios',
      backContent: [
        'Horario flexible',
        'Capacitación continua',
        'Ambiente inclusivo',
        'Seguro médico'
      ],
      flipped: false
    }
  ];


  nombre = '';
  apellido = '';
  cedula = '';
  direccion = '';
  correoE = '';
  contrasena = ''; 

  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' = 'success';
  loading = false;

  constructor(private usuarioServicio: RegistroService) {}

  toggleFlip(card: FlipCard) {
    card.flipped = !card.flipped;
  }

  agregarUsuario(formulario: NgForm) {
    if (formulario.invalid) {
      Object.values(formulario.controls).forEach(ctrl => ctrl.markAsTouched());
      return;
    }

    this.loading = true;

    const payload: Usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      cedula: this.cedula,
      direccion: this.direccion,
      correoE: this.correoE,
      contrasena: this.contrasena
    };

    this.usuarioServicio.guardarUsuario(payload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.modalType = 'success';
          this.modalTitle = 'Éxito';
          this.modalMessage = 'El usuario se guardó correctamente.';
          this.showModal = true;
          formulario.resetForm();
          setTimeout(() => this.closeModal(), 30000);
        },
        error: (err) => {
          console.error('Error al guardar usuario', err);
          this.modalType = 'error';
          this.modalTitle = 'Error';
          const backendMsg = err?.error?.mensaje || err?.message;
          this.modalMessage = backendMsg || 'Hubo un error al guardar el usuario. Intenta de nuevo.';
          this.showModal = true;
        }
      });
  }

  closeModal() {
    this.showModal = false;
  }
}
