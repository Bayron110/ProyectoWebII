import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Denuncia } from '../../interface/denuncia';
import { AuthDenuncia } from '../../service/auth-denuncia';
import { AuthPanico } from '../../service/auth-panico';  
import { Panico } from '../../interface/DenunciaRapida';

@Component({
  selector: 'app-vista-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vista-admin.html',
  styleUrls: ['./vista-admin.css']
})
export class VistaAdmin implements OnInit {

  adminInfo = {
    nombre: 'Admin',
    email: 'admin@gmail.com',
    rol: 'Administrador'
  };

  denuncias: Denuncia[] = [];
  panicos: Panico[] = [];
  cargando = false;
  error = '';
  mostrandoPanicos = false; 

  constructor(
    private authDenuncia: AuthDenuncia,
    private authPanico: AuthPanico,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDenuncias();
  }

  cargarDenuncias(): void {
    this.cargando = true;
    this.error = '';
    this.mostrandoPanicos = false;

    this.authDenuncia.obtenerDenuncias().subscribe({
      next: (data) => {
        this.denuncias = data;
        this.cargando = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar denuncias:', err);
        this.error = 'Error al cargar denuncias';
        this.cargando = false;
        this.cd.markForCheck();
      }
    });
  }

  cargarDenunciasPanico(): void {
    this.cargando = true;
    this.error = '';
    this.mostrandoPanicos = true;

    this.authPanico.obtenerPanicos().subscribe({
      next: (data) => {
        this.panicos = data;
        this.cargando = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar denuncias de pánico:', err);
        this.error = 'Error al cargar denuncias de pánico';
        this.cargando = false;
        this.cd.markForCheck();
      }
    });
  }

  verTodasDenuncias(): void {
    this.cargarDenuncias();
  }

  verDescripcion(denuncia: Denuncia): void {
    alert(`Descripción completa:\n\n${denuncia.descripcion}`);
  }

  verDescripcionPanico(panico: Panico): void {
    alert(`Detalles denuncia pánico:\nLugar: ${panico.lugar}\nFecha: ${panico.fecha}\nEstado: ${panico.estado}`);
  }

  aprobarDenuncia(denuncia: Denuncia): void {
    this.actualizarEstadoDenuncia(denuncia, 'APROBADO');
  }

  rechazarDenuncia(denuncia: Denuncia): void {
    this.actualizarEstadoDenuncia(denuncia, 'RECHAZADO');
  }

  marcarPendiente(denuncia: Denuncia): void {
    this.actualizarEstadoDenuncia(denuncia, 'PENDIENTE');
  }

  private actualizarEstadoDenuncia(denuncia: Denuncia, estado: string): void {
    this.authDenuncia.actualizarDenuncia(String(denuncia.id), { estado }).subscribe({
      next: (actualizada) => {
        denuncia.estado = actualizada.estado;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error(`Error al actualizar denuncia ${denuncia.id}:`, err);
        alert('Error al actualizar el estado de la denuncia.');
      }
    });
  }

  aprobarPanico(panico: Panico): void {
    this.actualizarEstadoPanico(panico, 'APROBADO');
  }

  rechazarPanico(panico: Panico): void {
    this.actualizarEstadoPanico(panico, 'RECHAZADO');
  }

  marcarPendientePanico(panico: Panico): void {
    this.actualizarEstadoPanico(panico, 'PENDIENTE');
  }

  private actualizarEstadoPanico(panico: Panico, estado: string): void {
  if (typeof panico.id !== 'number') {
    console.error('ID de pánico inválido.');
    alert('No se puede actualizar la denuncia de pánico porque el ID es inválido.');
    return;
  }

  const panicoActualizado: Panico = { ...panico, estado };

  this.authPanico.actualizarPanico(panico.id, panicoActualizado).subscribe({
    next: (actualizado) => {
      panico.estado = actualizado.estado;
      this.cd.markForCheck();
    },
    error: (err) => {
      console.error(`Error al actualizar denuncia pánico ${panico.id}:`, err);
      alert('Error al actualizar el estado de la denuncia de pánico.');
    }
  });
}
}
