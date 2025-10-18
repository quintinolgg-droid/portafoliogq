import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Experiencia from '../Models/Experiencia';

@Injectable({
  providedIn: 'root',
})
export class ExperienciasService {
  /*private apiUrl = 'http://localhost:5234/api/experiencia'; // URL de tu API

  constructor(private http: HttpClient) {}*/

  // Datos hardcodeados directamente en el servicio
  private experiencias: Experiencia[] = [
    {
      Id: 1,
      Titulo: 'Desarrollador Full Stack – Proyecto POS y Apps Móviles',
      Herramientas:
        'C#, .NET, Windows Forms, WPF, APIs REST, WebSockets, JavaScript, HTML, CSS, Bootstrap, Kotlin, Android Studio, Xamarin, MVC',
      Anios: 1,
      Meses: 3,
    },
    {
      Id: 2,
      Titulo: 'Portafolio de vida',
      Herramientas: 'Angular17, .Net Core',
      Anios: 0,
      Meses: 1,
    },
    {
      Id: 3,
      Titulo: 'Desarrollo Full Stack Angular 17 (freelancer)',
      Herramientas: 'Angular 17, Bootstrap, CSS, animaciones front',
      Anios: 0,
      Meses: 4,
    },
    {
      Id: 4,
      Titulo: 'Actualizaciones en Proyectos CI3 y Vue.js',
      Herramientas:
        'Vue.js, CI3, integración de funcionalidades, mejora de rendimiento, entrega continua',
      Anios: 0,
      Meses: 4,
    },
    {
      Id: 5,
      Titulo: 'Desarrollo Full Stack – Formulario de tipos de aprendizaje',
      Herramientas: 'PHP, MySQL',
      Anios: 0,
      Meses: 6,
    },
  ];

  // Retorna los datos como un Observable, simulando una llamada HTTP
  getExperiencias(): Observable<Experiencia[]> {
    return of(this.experiencias);
  }
}
