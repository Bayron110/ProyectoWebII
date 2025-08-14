import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./components/nav-bar/nav-bar";
import { Footer } from "./components/footer/footer";
import { BotonPanicoComponent } from "./components/boton-panico/boton-panico";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, Footer, BotonPanicoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Proyecto-app');
}
