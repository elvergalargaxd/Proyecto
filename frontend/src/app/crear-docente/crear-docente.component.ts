import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-crear-docente',
  templateUrl: './crear-docente.component.html',
  styleUrls: ['./crear-docente.component.css']
})
export class CrearDocenteComponent implements OnInit {

  constructor(private service:ApiserviceService, private  router:ActivatedRoute) { }


  
  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    
      this.getparamid =this.router.snapshot.paramMap.get('id');
      if(this.getparamid)
      {

      this.service.getSingleDataDocente(this.getparamid).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.patchValue({
            nombre:res.data[0].nombre,
            apPaterno:res.data[0].apPaterno,
            apMaterno:res.data[0].apMaterno,
            correo:res.data[0].correo,
            contrasena:res.data[0].contrasena,
            
        });
      });

      }
      
  }
  userForm =new FormGroup({
      'nombre':new FormControl('',Validators.required),
      'apPaterno':new FormControl('',Validators.required),
      'apMaterno':new FormControl('',Validators.required),
      'correo':new FormControl('',Validators.required),
      'contrasena':new FormControl('',Validators.required),
      
  });
  


  userSubmit(){
      if(this.userForm.valid)
      {
        console.log(this.userForm.value);
        this.service.createDataDocente(this.userForm.value).subscribe((res)=>{
          console.log(res,'res++=+');
          this.userForm.reset();
          this.successmsg=res.message;
        });

      }
      else{
        this.errormsg='todos los datos son requeridos';
      }
  }

  userUpdate()
  {
      console.log(this.userForm.value,'updatedform');
      if(this.userForm  .valid  )
      {
          this.service.updateDataDocente(this.userForm.value,this.getparamid).subscribe((res)=>{
                console.log(res,'modificado');

                this.successmsg=res.message;
          })
      }else{
        this.errormsg='todo es requerido'
      }
  }


}
