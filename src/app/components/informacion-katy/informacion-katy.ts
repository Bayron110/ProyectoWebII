import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Valor {
  icono: string;
  titulo: string;
  descripcion: string;
}

interface Servicio {
  icon: string;
  titulo: string;
  descripcion: string;
}
@Component({
  selector: 'app-informacion-katy',
  imports: [CommonModule],
  templateUrl: './informacion-katy.html',
  styleUrl: './informacion-katy.css'
})
export class InformacionKaty {
valores: Valor[] = [
    {
      icono: 'https://i.postimg.cc/HnbHs3VH/18036261.png',
      titulo: 'Integridad',
      descripcion: 'Actuamos con honestidad, transparencia y ética en todas nuestras acciones, siendo ejemplo para la sociedad.'
    },
    {
      icono: 'https://i.postimg.cc/7YjfmQyP/ley.png',
      titulo: 'Justicia',
      descripcion: 'Garantizamos el cumplimiento de la ley con equidad, respetando los derechos de todos los ciudadanos.'
    },
    {
      icono: 'https://i.postimg.cc/fW7bxjwp/confianza.png',
      titulo: 'Respeto',
      descripcion: 'Valoramos la dignidad humana y tratamos a todas las personas con consideración y cortesía.'
    },
    {
      icono: 'https://i.postimg.cc/fLZGZd6S/public-service.png',
      titulo: 'Servicio',
      descripcion: 'Nos dedicamos con vocación al servicio de la comunidad, priorizando el bienestar ciudadano.'
    },
    {
      icono: 'https://i.postimg.cc/GhBSWzHS/profesionalismo.png',
      titulo: 'Profesionalismo',
      descripcion: 'Mantenemos altos estándares de preparación técnica y actualización continua.'
    },
    {
      icono: 'https://i.postimg.cc/SxFVw40J/compromiso.png',
      titulo: 'Compromiso',
      descripcion: 'Asumimos con responsabilidad nuestra misión de proteger y servir a la sociedad.'
    }
  ];

  servicios: Servicio[] = [
    {
      icon: 'https://i.postimg.cc/DzjB8bNM/barrera-2.png',
      titulo: 'Seguridad Vial',
      descripcion: 'Control de tráfico, prevención de accidentes y educación vial para garantizar la movilidad segura.'
    },
    {
      icon: 'https://i.postimg.cc/VNX0hSyV/escena-del-crimen.png',
      titulo: 'Investigación Criminal',
      descripcion: 'Investigación especializada de delitos para el esclarecimiento de casos y administración de justicia.'
    },
    {
      icon: 'https://i.postimg.cc/76sHtDLR/proteger.png',
      titulo: 'Seguridad Ciudadana',
      descripcion: 'Patrullaje preventivo y respuesta inmediata para mantener el orden y la seguridad pública.'
    },
    {
      icon: 'https://i.postimg.cc/vmCpDL83/delito.png',
      titulo: 'Prevención del Delito',
      descripcion: 'Programas comunitarios y estrategias preventivas para reducir los índices delictivos.'
    },
    {
      icon: 'https://i.postimg.cc/tThmTKM4/llamada-de-emergencia.png',
      titulo: 'Atención de Emergencias',
      descripcion: 'Respuesta rápida y eficiente ante situaciones de emergencia las 24 horas del día.'
    },
    {
      icon: 'https://i.postimg.cc/QM7fYLsJ/educacion.png',
      titulo: 'Educación Comunitaria',
      descripcion: 'Programas educativos sobre seguridad, prevención y cultura de paz dirigidos a la comunidad.'
    }
  ];

  constructor() { }
  

}
