import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Registro } from './pages/registro/registro';

export const routes: Routes = [

    {path:"home", component:Home},
    {path:"registro", component:Registro},
    {path:"", redirectTo:"/home", pathMatch:"full"}

];
