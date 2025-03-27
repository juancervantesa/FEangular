import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { AmenazasComponent } from './pages/amenazas/amenazas.component';
import { ProteccionComponent } from './pages/proteccion/proteccion.component';
import { RecursosComponent } from './pages/recursos/recursos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
{
  path: '',
  component: IndexComponent,

},
{
  path: 'amenazas',
  component:AmenazasComponent,
},
{
  path: 'proteccion',
  component:ProteccionComponent,
},
{
  path: 'recursos',
  component:RecursosComponent,
},
{
  path: 'contacto',
  component:ContactoComponent,
},
{
  path: 'login',
  component:LoginComponent,
},
{
  path: '**',
  redirectTo: '',
}



];
