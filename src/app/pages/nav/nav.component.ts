import { Component, HostListener } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavService } from '../../services/nav.service';
import NavItems from '../../Models/Navs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  verticalMenu: boolean = false;
  screenWidth: number = 0;

  navs: NavItems[] = [];

  constructor(public router: Router, private navServices: NavService) {
    this.navs = this.navServices.getNav();
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.updateMenuVisibility();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    this.updateMenuVisibility();
  }

  updateMenuVisibility() {
    if (this.screenWidth >= 768) {
      // desktop → menú siempre visible
      this.verticalMenu = true;
    } else {
      // móvil → menú oculto por defecto
      this.verticalMenu = false;
    }
  }

  toggleMenu() {
    // Solo cambia visibilidad en móvil
    if (this.screenWidth < 768) {
      this.verticalMenu = !this.verticalMenu;
    }
  }
}
