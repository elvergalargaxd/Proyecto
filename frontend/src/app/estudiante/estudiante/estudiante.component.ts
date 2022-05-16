import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  constructor(private service:Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    localStorage.removeItem('token');
    this.service.navigate(['login']);
  }
}
