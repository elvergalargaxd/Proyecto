import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  constructor(private service:Router) { }

  ngOnInit(): void {
  }
  onLogout(){
    localStorage.clear();
    this.service.navigate(['login']);
  }
}
