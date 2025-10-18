import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Lenguajes from '../Models/Lenguajes';

@Injectable({
  providedIn: 'root',
})
export class LenguajesService {
  /*private apiUrl = 'http://localhost:5234/api/lenguajes';

  constructor(private http: HttpClient) {}*/

  // Datos hardcodeados directamente en el servicio
  private lenguajes: Lenguajes[] = [
    {
      Id: 1,
      Nombre: 'JS',
      Anios: 2,
      Meses: 0,
      Descripcion:
        'Creación de módulos en una página web, y conexión a chats bots de WhatsApp Messenger.',
    },
    {
      Id: 2,
      Nombre: 'C#',
      Anios: 7,
      Meses: 2,
      Descripcion:
        'Es mi primer lenguaje que trabajé desde la preparatoria, además ya he trabajado en un empleo en la creación de un punto de venta con .NET Entity Framework, usando Windows Forms y migrado al final a WPF.',
    },
    {
      Id: 3,
      Nombre: 'Kotlin',
      Anios: 1,
      Meses: 0,
      Descripcion:
        'Desarrollo en la parte del Front, además de animaciones. Proyecto que llegó 2 años consecutivos a etapa nacional en Innovatec.',
    },
    {
      Id: 4,
      Nombre: 'Python',
      Anios: 0,
      Meses: 6,
      Descripcion:
        'Mayormente enfocado al análisis de datos y automatización de tareas.',
    },
    {
      Id: 5,
      Nombre: 'PHP',
      Anios: 5,
      Meses: 2,
      Descripcion:
        'Creación como freelancer de formularios y desarrollo fullstack en sector bancario.',
    },
    {
      Id: 6,
      Nombre: 'TS',
      Anios: 1,
      Meses: 0,
      Descripcion:
        'Usado en proyectos de Angular junto con .NET para aplicaciones web.',
    },
    {
      Id: 7,
      Nombre: 'HTML5',
      Anios: 6,
      Meses: 0,
      Descripcion:
        'Desarrollo front como freelancer de formularios y sitios web responsivos.',
    },
    {
      Id: 8,
      Nombre: 'CSS',
      Anios: 6,
      Meses: 0,
      Descripcion:
        'Estilizado de interfaces web, responsive design y animaciones básicas.',
    },
    {
      Id: 9,
      Nombre: 'Bootstrap',
      Anios: 6,
      Meses: 0,
      Descripcion:
        'Framework usado para maquetación rápida y responsive de sitios web.',
    },
    {
      Id: 10,
      Nombre: 'Bulma',
      Anios: 4,
      Meses: 0,
      Descripcion:
        'Diseño de interfaces web con clases CSS predefinidas, maquetación limpia.',
    },
    {
      Id: 11,
      Nombre: 'jQuery',
      Anios: 2,
      Meses: 0,
      Descripcion:
        'Manipulación del DOM, animaciones y simplificación de llamadas AJAX.',
    },
    {
      Id: 12,
      Nombre: 'APIs REST',
      Anios: 1,
      Meses: 0,
      Descripcion:
        'Integración de servicios externos y comunicación entre sistemas.',
    },
    {
      Id: 13,
      Nombre: 'WebSocket',
      Anios: 0,
      Meses: 6,
      Descripcion:
        'Implementación de comunicación en tiempo real en aplicaciones web.',
    },
    {
      Id: 14,
      Nombre: 'SQL',
      Anios: 5,
      Meses: 0,
      Descripcion:
        'Creación y optimización de consultas, procedimientos y triggers.',
    },
    {
      Id: 15,
      Nombre: 'JSON',
      Anios: 3,
      Meses: 0,
      Descripcion: 'Formato de intercambio de datos entre cliente y servidor.',
    },
    {
      Id: 16,
      Nombre: 'Git',
      Anios: 4,
      Meses: 0,
      Descripcion:
        'Control de versiones y manejo de ramas en proyectos de software.',
    },
    {
      Id: 17,
      Nombre: 'GitHub',
      Anios: 4,
      Meses: 0,
      Descripcion:
        'Repositorio remoto para gestión de proyectos y colaboración.',
    },
    {
      Id: 18,
      Nombre: 'GitLab',
      Anios: 2,
      Meses: 0,
      Descripcion: 'Gestión de repositorios en proyectos profesionales.',
    },
    {
      Id: 19,
      Nombre: 'EntityF',
      Anios: 5,
      Meses: 0,
      Descripcion:
        'ORM para manejo de bases de datos en .NET, migraciones y consultas LINQ.',
    },
    {
      Id: 20,
      Nombre: '.NET Core',
      Anios: 5,
      Meses: 0,
      Descripcion: 'Desarrollo de APIs y aplicaciones web robustas en .NET.',
    },
    {
      Id: 21,
      Nombre: 'Xamarin',
      Anios: 2,
      Meses: 0,
      Descripcion: 'Desarrollo cross-platform de aplicaciones móviles con C#.',
    },
    {
      Id: 22,
      Nombre: 'Angular',
      Anios: 0,
      Meses: 6,
      Descripcion:
        'Desarrollo de interfaces web dinámicas y modulares con Angular 17.',
    },
    {
      Id: 23,
      Nombre: 'React',
      Anios: 0,
      Meses: 6,
      Descripcion:
        'Desarrollo de aplicaciones web con componentes y estado reactivo.',
    },
    {
      Id: 24,
      Nombre: 'Vue.js',
      Anios: 0,
      Meses: 6,
      Descripcion:
        'Creación de interfaces web reactivas y componentes modulares.',
    },
    {
      Id: 25,
      Nombre: 'POO',
      Anios: 6,
      Meses: 0,
      Descripcion:
        'Aplicación de principios de programación orientada a objetos.',
    },
    {
      Id: 26,
      Nombre: 'MVC',
      Anios: 3,
      Meses: 0,
      Descripcion:
        'Arquitectura de software para separación de responsabilidades en aplicaciones web.',
    },
    {
      Id: 27,
      Nombre: 'MySQL',
      Anios: 5,
      Meses: 0,
      Descripcion:
        'Administración y optimización de bases de datos relacionales.',
    },
    {
      Id: 28,
      Nombre: 'SQLSrv',
      Anios: 5,
      Meses: 0,
      Descripcion:
        'Gestión de bases de datos, consultas complejas y procedimientos almacenados.',
    },
    {
      Id: 29,
      Nombre: 'XML',
      Anios: 1,
      Meses: 5,
      Descripcion: 'Desarrollo de aplicaciones moviles y de escritorio.',
    },
  ];

  constructor() {}

  // Retorna los datos como un Observable
  getLenguages(): Observable<Lenguajes[]> {
    return of(this.lenguajes);
  }
}
