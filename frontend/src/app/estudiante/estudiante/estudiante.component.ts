import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  constructor(private _CargarScripts:CargarScriptsService,private service:Router) {
    _CargarScripts.Carga(["menu"]);
   }

  ngOnInit(): void {
  }

  onLogout(){
    localStorage.removeItem('token');
    this.service.navigate(['login']);
  }
}
