export interface Denuncia {
  id?: number | string;
  categoria: string;
  descripcion: string;
  callePrincipal: string;
  calleSecundaria: string;
  referenciaVisible: string;
  fecha: string;  
  estado?: string; 
  denunciante: string;
}
