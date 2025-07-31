import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Capturado {
  id: number;
  nombre: string;
  apellido: string;
  foto: string;
  fenix: string;
  delito: string;
  descripcion: string;
  destacado?: boolean;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit, OnDestroy {
  capturados: Capturado[] = [
    {
      id: 1,
      nombre: 'Torres Pinto',
      apellido: 'Héctor Guillermo',
      foto: 'https://static.theclinic.cl/media/2013/10/anthony-garcia.jpg',
      fenix: 'PLAN FENIX - 23',
      delito: 'Robo',
      descripcion: 'Procesado por delitos contra la propiedad'
    },
    {
      id: 2,
      nombre: 'Alarcón Sánchez',
      apellido: 'José Rafael',
      foto: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/1c25/live/3e1138f0-00c8-11ef-be94-612b825535d6.jpg.webp',
      fenix: 'PLAN FENIX - 24',
      delito: 'Violencia de Género',
      descripcion: 'Detenido como El Jadano Primer Más Buscado por la provincia de El Oro por delitos de violencia de género, procesado por el presunto delito de violación.',
      destacado: true
    },
    {
      id: 3,
      nombre: 'Quiñónez Landázuri',
      apellido: 'Jimer Franco',
      foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6aZk77tNOZOVW4PI_GXGCz4wMjTB_yJzz-A&s',
      fenix: 'PLAN FENIX - 25',
      delito: 'Tráfico de drogas',
      descripcion: 'Procesado por tráfico ilícito de sustancias estupefacientes'
    },
    {
      id: 4,
      nombre: 'María Fernanda',
      apellido: 'Paredes López',
      foto: 'https://www.policia.gov.co/sites/default/files/noticias/imagen-uno-es-capturada-con-orden-judicial-una-mujer-por-varios-delitos-en-el-area-metropolitana-de-pereira.jpeg',
      fenix: 'PLAN FENIX - 26',
      delito: 'Asociación ilícita',
      descripcion: 'Implicada en red criminal dedicada al lavado de activos',
      destacado: true
    },
    {
      id: 5,
      nombre: 'Carlos Eduardo',
      apellido: 'Mera Quishpe',
      foto: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/6d10/live/9615d4b0-5280-11f0-ad6a-617a010885d7.jpg.webp',
      fenix: 'PLAN FENIX - 27',
      delito: 'Robo agravado',
      descripcion: 'Participación en robo a entidad financiera con uso de armas',
      destacado: true
    },
    {
      id: 6,
      nombre: 'Jorge Luis',
      apellido: 'Tamayo Delgado',
      foto: 'https://palmira.gov.co/wp-content/uploads/2024/11/captura-junior-1024x768.jpeg',
      fenix: 'PLAN FENIX - 28',
      delito: 'Extorsión',
      descripcion: 'Vinculado a casos de extorsión mediante amenazas digitales'
    },
    {
      id: 7,
      nombre: 'Verónica Andrea',
      apellido: 'Reinoso Carrión',
      foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdESA_sKcQJz_aSkEjC0-P8aqjJg-qcmj86Q&s',
      fenix: 'PLAN FENIX - 29',
      delito: 'Secuestro',
      descripcion: 'Involucrada en secuestro exprés en la zona norte del país',
      destacado: true
    }
  ];

  currentIndex = 0;
  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => this.nextSlide(), 3000); // Cambia cada 3 segundos
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  previousSlide() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.capturados.length - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.capturados.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}