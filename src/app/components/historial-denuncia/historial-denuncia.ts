import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Denuncia } from '../../interface/denuncia';
import { AuthDenuncia } from '../../service/auth-denuncia';

@Component({
  selector: 'app-historial-denuncia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-denuncia.html',
  styleUrls: ['./historial-denuncia.css']
})
export class HistorialDenuncia implements OnInit {
  denuncias: Denuncia[] = [];
  error: string = '';

  constructor(private authDenuncia: AuthDenuncia) {}

  ngOnInit() {
    this.cargarDenuncias();
  }

  cargarDenuncias() {
    this.authDenuncia.obtenerDenuncias().subscribe({
      next: (data) => {
        this.denuncias = data;
      },
      error: () => {
        this.error = 'Error cargando las denuncias.';
      }
    });
  }
}
