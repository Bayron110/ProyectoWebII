import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Denuncia } from '../../interface/admin';



@Component({
  selector: 'app-vista-admin',
  imports: [FormsModule, CommonModule],
  templateUrl: './vista-admin.html',
  styleUrl: './vista-admin.css'
})

export class VistaAdmin {
  

adminInfo = {
    nombre: 'Admin',
    email: 'admin@gmail.com',
    rol: '123456'
  };

  denuncias: Denuncia[] = [
    {
      id: 1,
      categoria: 'Tipo B',
      descripcion: 'Desplazamiento de Tierra a la Carretera',
      callePrincipal: 'Av.Simon Bolivar',
      calleSecundaria: 'Av.Moran Valverde',
      referencia: '5 Metros arriba desde la Puerta Negra/Entrada San Martin',
      fecha: '2025-06-17',
      estado: 'PENDIENTE'
    }
  ];

  verTodasDenuncias() {
    console.log('Ver todas las denuncias...');
    
  }

  verDescripcion(denuncia: Denuncia) {
    console.log('Ver descripción:', denuncia);
    
  }

  aprobarDenuncia(denuncia: Denuncia) {
    denuncia.estado = 'APROBADO';
    console.log('Denuncia aprobada:', denuncia);
  }

  rechazarDenuncia(denuncia: Denuncia) {
    denuncia.estado = 'RECHAZADO';
    console.log('Denuncia rechazada:', denuncia);
  }

  marcarPendiente(denuncia: Denuncia) {
    denuncia.estado = 'PENDIENTE';
    console.log('Denuncia marcada como pendiente:', denuncia);
  }

}
