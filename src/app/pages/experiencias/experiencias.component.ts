import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import Experiencia from '../../Models/Experiencia';
import { Observable } from 'rxjs';
import { ExperienciasService } from '../../services/experiencias.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-experiencias',
  standalone: true,
  imports: [NavComponent, NgFor],
  templateUrl: './experiencias.component.html',
  styleUrl: './experiencias.component.scss',
})
export class ExperienciasComponent {
  experiencias: Experiencia[] = [];
  experiencia: Observable<Experiencia[]>;

  constructor(private experienciasService: ExperienciasService) {
    this.experiencia = experienciasService.getExperiencias();
  }

  ngAfterViewInit(): void {
    // Esperamos a que los lenguajes estén cargados para inicializar el globo
    this.experiencia.subscribe((langs) => {
      this.experiencias = langs;
    });
  }
}
