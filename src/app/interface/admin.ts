export interface Denuncia {
    id: number;
    categoria: string;
    descripcion: string;
    callePrincipal: string;
    calleSecundaria: string;
    referencia: string;
    fecha: string;
    estado: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
}