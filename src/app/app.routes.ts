import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Registro } from './pages/registro/registro';
import { Nosotros } from './pages/nosotros/nosotros';

export const routes: Routes = [

    {path:"home", component:Home},
    {path:"registro", component:Registro},
    {path:"nosotros", component:Nosotros},
    {path:"", redirectTo:"/home", pathMatch:"full"}

];
