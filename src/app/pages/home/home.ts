import { Component } from '@angular/core';
import { Carusel } from "../../components/carusel/carusel";
import { Noticias } from "../../components/noticias/noticias";
import { CardComponent } from "../../components/card/card.component";

@Component({
  selector: 'app-home',
  imports: [Carusel, Noticias, CardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
