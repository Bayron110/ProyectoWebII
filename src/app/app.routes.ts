import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Registro } from './pages/registro/registro';
import { Nosotros } from './pages/nosotros/nosotros';
import { TablaUsuarios } from './components/tabla-usuarios/tabla-usuarios';
import { TablaOficiales } from './components/tabla-oficiales/tabla-oficiales';

export const routes: Routes = [

    {path:"home", component:Home},
    {path:"registro", component:Registro},
    {path:"nosotros", component:Nosotros},
    {path:"Tabla1", component:TablaUsuarios},
    {path:"Tabla2", component:TablaOficiales},
    {path:"", redirectTo:"/home", pathMatch:"full"}

];
