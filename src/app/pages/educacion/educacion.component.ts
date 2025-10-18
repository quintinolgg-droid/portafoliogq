import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { EducacionService } from '../../services/educacion.service';
import Educacion from '../../Models/Educacion';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-educacion',
  standalone: true,
  imports: [NavComponent, NgFor],
  templateUrl: './educacion.component.html',
  styleUrl: './educacion.component.scss',
})
export class EducacionComponent {
  educacion: Observable<Educacion[]>;
  edu: Educacion[] = [];
  constructor(private educacionService: EducacionService) {
    this.educacion = educacionService.getEducacion();
  }

  ngAfterViewInit(): void {
    // Esperamos a que los lenguajes estén cargados para inicializar el globo
    this.educacion.subscribe((langs) => {
      this.edu = langs;
    });
  }
}
