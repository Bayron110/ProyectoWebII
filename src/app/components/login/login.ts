import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../service/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule]
})
export class Login {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private auth: Auth, private router: Router) {}

  iniciarSesion() {
    if (!this.email || !this.password) {
      this.error = 'Por favor ingrese correo y contraseña.';
      return;
    }

    this.auth.login(this.email.trim(), this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['home']);
      } else {
        this.error = 'Correo o contraseña incorrectos.';
      }
    }, () => {
      this.error = 'Error al conectar con el servidor.';
    });
  }
}
