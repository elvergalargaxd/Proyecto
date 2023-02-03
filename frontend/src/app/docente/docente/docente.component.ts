import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';  
import { ApiserviceService } from 'src/app/apiservice.service';
import  decode  from 'jwt-decode';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  constructor(private service:Router, private _CargarScripts:CargarScriptsService, private serviceBdd:ApiserviceService) {
    _CargarScripts.Carga(["menu"]); 
   } 
   getparamid:any;
   imgUrl='assets/noimage.png';
   data:any;
   readData:any;

  ngOnInit(): void {

    const token =localStorage.getItem('token') as string;
    let decodetoken:any = {};
    decodetoken = decode(token);
  
    console.log(decodetoken.id);

    this.data=decodetoken.id;

    this.serviceBdd.cursosDocente(this.data).subscribe((res)=>{
      console.log(res,'res==>');
      this.readData=res.data;
    });

  }
  onLogout(){
    localStorage.clear();
    this.service.navigate(['login']);



  }
}
