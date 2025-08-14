export interface Usuario {
    id?: number;       
    nombre: string;
    apellido: string;
    cedula: string;   
    direccion: string;
    correoE: string;    
    contrasena: string; 
}

export interface UsuarioConId {
    id: string;
    nombre?: string;
    apellido?: string;
    cedula?: string;
    direccion?: string;
    email?: string;
    password?: string;
}