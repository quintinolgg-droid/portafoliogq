import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Producto from '../../Models/Lenguajes';
import { NavComponent } from '../nav/nav.component';
import { HomeService } from '../../services/home.service';
import Home from '../../Models/Home';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [HomeService],
})
export class HomeComponent implements OnInit {
  user: Home[] = [];
  showContacts = false;

  constructor(private usuarioService: HomeService) {}

  ngOnInit(): void {}
}
