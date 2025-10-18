import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Educacion from '../Models/Educacion';

@Injectable({
  providedIn: 'root',
})
export class EducacionService {
  /*private apiUrl = 'http://localhost:5234/api/educacion'; // URL de tu API

  constructor(private http: HttpClient) {}*/

  // Datos "hardcodeados" directamente en el servicio
  private educaciones: Educacion[] = [
    {
      Id: 1,
      Nombre: 'Instituto Tecnológico Superior del Sur de Guanajuato',
      Grado: 'Ingeniería en Sistemas Computacionales',
      Descripcion:
        'Formación integral en el desarrollo de software, arquitectura de sistemas, bases de datos, redes y gestión de proyectos tecnológicos.',
    },
    {
      Id: 2,
      Nombre: 'CBTis No. 217',
      Grado: 'Bachillerato Tecnológico en Programación',
      Descripcion:
        'Enfoque en la lógica de programación, desarrollo de aplicaciones, fundamentos de bases de datos y resolución de problemas mediante la tecnología.',
    },
    {
      Id: 3,
      Nombre: 'Java',
      Grado: 'Certificación en Sololearn',
      Descripcion:
        'Principio básicos de la programación orientada a objetos en Java.',
    },
    {
      Id: 4,
      Nombre: 'Kotlin',
      Grado: 'Certificación en Sololearn',
      Descripcion:
        'Principio básicos de la programación orientada a objetos en Kotlin.',
    },
    {
      Id: 5,
      Nombre: 'HTML5',
      Grado: 'Certificación en Ademass',
      Descripcion: 'Principios básicos de HTML5 y maquetación web.',
    },
    {
      Id: 6,
      Nombre: 'JavaScript',
      Grado: 'Certificación en Ademass',
      Descripcion: 'Desarrollo de aplicaciones web.',
    },
    {
      Id: 8,
      Nombre: 'Bootstrap',
      Grado: 'Certificación en Ademass',
      Descripcion:
        'Diseño funcional con Bootstrap y CSS, incluyendo animaciones.',
    },
    {
      Id: 9,
      Nombre: 'SQL',
      Grado: 'Certificación en Ademass',
      Descripcion: 'Introducción a SQL y sus funcionalidades avanzadas.',
    },
    {
      Id: 10,
      Nombre: 'PHP',
      Grado: 'Certificación en Ademass',
      Descripcion: 'Desarrollo de aplicaciones web con PHP.',
    },
    {
      Id: 11,
      Nombre: 'Talento emprendedor',
      Grado: 'TecNM',
      Descripcion: 'Principios para el emprendimiento y desarrollo personal.',
    },
  ];

  constructor() {}

  // Retorna los datos como un Observable, simulando una llamada HTTP
  getEducacion(): Observable<Educacion[]> {
    return of(this.educaciones);
  }
}
