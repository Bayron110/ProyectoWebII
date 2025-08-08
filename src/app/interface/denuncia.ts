export interface Denuncia {
  id?: string;
  denunciante: string;
  fecha: string;        
  lugar: string;
  descripcion: string;
  estado?: string;       
}