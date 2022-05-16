import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {

  constructor(private service:ApiserviceService, private  router:ActivatedRoute, private routernav:Router) { }


  
  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    
      this.getparamid =this.router.snapshot.paramMap.get('id');
      if(this.getparamid)
      {

      this.service.getSingleDataCurso(this.getparamid).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.patchValue({
            nombre:res.data[0].nombre,
            descripcion:res.data[0].descripcion,
            imagen:res.data[0].imagen,
            idDocente:res.data[0].idDocente
            
        });
      });

      }
      
  }
  userForm =new FormGroup({
      'nombre':new FormControl('',Validators.required),
      'descripcion':new FormControl('',Validators.required),
      'imagen':new FormControl('',Validators.required),
      'idDocente':new FormControl('',Validators.required)
      
  });
  
  onLogout(){
      localStorage.clear();
      this.routernav.navigate(['login']);
  }

  userSubmit(){
      if(this.userForm.valid)
      {
        console.log(this.userForm.value);
        this.service.createDataCurso(this.userForm.value).subscribe((res)=>{
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
          this.service.updateDataCurso(this.userForm.value,this.getparamid).subscribe((res)=>{
                console.log(res,'modificado');

                this.successmsg=res.message;
          })
      }else{
        this.errormsg='todo es requerido'
      }
  }


}
