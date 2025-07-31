import { Component } from '@angular/core';
import { Carusel } from "../../components/carusel/carusel";
import { Noticias } from "../../components/noticias/noticias";

@Component({
  selector: 'app-home',
  imports: [Carusel, Noticias],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
