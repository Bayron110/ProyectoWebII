export interface Usuario {
    id?: string,
    nombre: string,
    apellido: string,
    cedula: number,
    direccion: string,
    email: string,
    password: string;

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