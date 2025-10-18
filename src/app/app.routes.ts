import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EducacionComponent } from './pages/educacion/educacion.component';
import { LenguajesComponent } from './pages/lenguajes/lenguajes.component';
import { ExperienciasComponent } from './pages/experiencias/experiencias.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'experiencias', component: ExperienciasComponent },
  { path: 'lenguajes', component: LenguajesComponent },
  { path: 'educacion', component: EducacionComponent },
];
