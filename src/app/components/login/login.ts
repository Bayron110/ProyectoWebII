import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../service/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule]
})
export class Login {
  correoE: string = '';
  contrasena: string = '';
  error: string | null = null;

  constructor(private auth: Auth, private router: Router) {}

  iniciarSesion() {
    if (!this.correoE.trim() || !this.contrasena.trim()) {
      this.error = 'Por favor ingrese correo y contraseña.';
      return;
    }

    this.auth.login(this.correoE.trim(), this.contrasena.trim()).subscribe(
      res => {
        if (res.success) {
          this.error = null;

          // Redirigir según rol
          if (res.rol === 'ADMIN') {
            this.router.navigate(['/vista-admin']);
          } else if (res.rol === 'USUARIO') {
            this.router.navigate(['/home']); 
          } else {
            this.error = 'Rol no reconocido.';
          }
        } else {
          this.error = res.mensaje || 'Correo o contraseña incorrectos.';
        }
      },
      () => {
        this.error = 'Error al conectar con el servidor.';
      }
    );
  }
}
