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
  readDataCurso:any;

  ngOnInit(): void {

      
    
      this.getparamid =this.router.snapshot.paramMap.get('id');
      if(this.getparamid)
      {

      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.patchValue({
          nombre:res.data[0].nombre,
          apellido:res.data[0].apellido,
          userName:res.data[0].userName,
          roleID:res.data[0].roleId,
          correo:res.data[0].correo,
          telefono:res.data[0].telefono,
          contrasena:res.data[0].pass,
        });
      });

      }
      
  }
  userForm =new FormGroup({
    'nombre':new FormControl('',Validators.required),
    'apellido':new FormControl('',Validators.required),
    'userName':new FormControl('',Validators.required),
    'roleID':new FormControl('docente'),
    'correo':new FormControl('',Validators.required),
    'telefono':new FormControl('',[Validators.required,Validators.minLength(6)]),
    'contrasena':new FormControl('',Validators.required),
      
  });
  


  userSubmit(){
      if(this.userForm.valid)
      {
        console.log(this.userForm.value);
        this.service.createData(this.userForm.value).subscribe((res)=>{
          console.log(res,'res++=+');
          this.userForm.reset();
          this.successmsg=res.message;
        });

      }
      else{
        this.errormsg='todos los datos son requeridos';
      }
  }
  getAllData(){
    this.service.getAllDataCurso().subscribe((res)=>{
      console.log(res,'res==>');
      this.readDataCurso=res.data;
    })
  }

  userUpdate()
  {
      console.log(this.userForm.value,'updatedform');
      if(this.userForm.valid  )
      {
          this.service.updateData(this.userForm.value,this.getparamid).subscribe((res)=>{
                console.log(res,'modificado');

                this.successmsg=res.message;
          })
      }else{
        this.errormsg='todo es requerido'
      }
  }


}
