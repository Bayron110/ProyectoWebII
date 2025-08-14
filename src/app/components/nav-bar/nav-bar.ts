import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css']
})
export class NavBar {
  constructor(public auth: Auth, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  esAdmin(): boolean {
    return localStorage.getItem('usuarioRol') === 'ADMIN';
  }

  esUsuario(): boolean {
    return localStorage.getItem('usuarioRol') === 'USUARIO';
  }

  estaLogueado(): boolean {
    return localStorage.getItem('usuarioLogueado') === 'true';
  }
}
