import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  imports: [CommonModule],
  templateUrl: './formulario-registro.html',
  styleUrl: './formulario-registro.css'
})
export class FormularioRegistro {
backgroundImageUrl = 'https://via.placeholder.com/1600x900'; // reemplaza con tu URL dinámica si quieres

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

  toggleFlip(card: FlipCard) {
    card.flipped = !card.flipped;
  }

  submitForm(event: Event) {
    event.preventDefault();
    // lógica de envío (por ejemplo, validaciones y llamada a servicio)
    console.log('Formulario enviado');
  }
}