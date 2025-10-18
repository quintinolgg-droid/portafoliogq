import { Injectable } from '@angular/core';
import NavItems from '../Models/Navs';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  constructor() {}

  navs: NavItems[] = [
    { id: 'home', nombre: 'Inicio', url: '/home' },
    { id: 'experiencias', nombre: 'Experiencias', url: '/experiencias' },
    { id: 'lenguajes', nombre: 'Lenguajes', url: '/lenguajes' },
    { id: 'educacion', nombre: 'Educacion', url: '/educacion' },
  ];

  getNav(): NavItems[] {
    return this.navs;
  }
}
