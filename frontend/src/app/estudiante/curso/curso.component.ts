import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service'; 
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CargarScriptsService } from 'src/app/cargar-scripts.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  constructor(private routerDireccion:Router,private service:ApiserviceService,private  router:ActivatedRoute,private _CargarScripts:CargarScriptsService) { 
    _CargarScripts.Carga(["videos"]);
    _CargarScripts.Carga(["select2"]);
  }

  getparamid:any;
  readData:any;

  ngOnInit(): void {
    
    this.getparamid=this.router.snapshot.paramMap.get('id');

    if(this.getparamid)
    {
      console.log("id curso"+ this.getparamid);

        this.service.getSingleDataClase(this.getparamid).subscribe((res) => {
        console.log(res, 'res==>');
        this.readData = res.data;
      })
      
    }
    else{
      console.log("id no encontrado");
    }
  }

  getAllDataVideo() {
    this.service.getSingleDataClase(this.getparamid).subscribe((res) => {
      console.log(res, 'res==>');
      this.readData = res.data;
    })
  }
  claseForm = new FormGroup({
    'nombreClase': new FormControl('', Validators.required),
    'descripcionClase': new FormControl('', Validators.required),
    'idClase': new FormControl(''),
    'posicion': new FormControl(new Date().getTime()),
    'video':new FormControl('')

  });

  IngresarEvaluacion(){
    
    console.log("curso "+this.getparamid)
    this.routerDireccion.navigate(['estudiante/evaluacion/',this.getparamid]);
    //  this.router.navigate(['/estudiante/curso'])
    // this.servise.diparadorCursos.emit({
    //   data:id 
    // })

     //
   } 
  
}
