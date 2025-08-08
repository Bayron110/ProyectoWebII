import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Registro } from './pages/registro/registro';
import { Nosotros } from './pages/nosotros/nosotros';
import { TablaUsuarios } from './components/tabla-usuarios/tabla-usuarios';
import { TablaOficiales } from './components/tabla-oficiales/tabla-oficiales';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';
import { RegistroDenuncia } from './components/registro-denuncia/registro-denuncia';
import { HistorialDenuncia } from './components/historial-denuncia/historial-denuncia';

export const routes: Routes = [

    {path:"home", component:Home},
    {path:"login", component:Login},
    {path:"registro", component:Registro},
    {path:"nosotros", component:Nosotros},
    {path:"Tabla1", component:TablaUsuarios},
    {path:"Tabla2", component:TablaOficiales},
    {path:"",
        canActivateChild: [authGuard],
        children:[
            {path:"rDenuncia", component:RegistroDenuncia},
            {path:"HDenuncia", component:HistorialDenuncia}
        ]
    },
    {path:"", redirectTo:"/home", pathMatch:"full"}

];
