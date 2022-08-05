import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginComponent} from '../../login/login.component';
import  decode  from 'jwt-decode';

@Component({
  selector: 'app-editar-perfil-estudiante',
  templateUrl: './editar-perfil-estudiante.component.html',
  styleUrls: ['./editar-perfil-estudiante.component.css']
})
export class EditarPerfilEstudianteComponent implements OnInit {

  constructor(private service:ApiserviceService, private  router:ActivatedRoute) { }
  data:any;
  errormsg:any;
  successmsg:any;

  ngOnInit(): void {
        const token =localStorage.getItem('token') as string;
        let decodetoken:any = {};
        decodetoken = decode(token);
      
        console.log(decodetoken.id);

        this.data=decodetoken.id;
         
          this.service.getSingleData(this.data).subscribe((res)=>{
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

    userForm =new FormGroup({
      'nombre':new FormControl('',Validators.required),
      'apellido':new FormControl('',Validators.required),
      'userName':new FormControl('',Validators.required),
      'roleID':new FormControl('docente'),
      'correo':new FormControl('',Validators.required),
      'telefono':new FormControl('',[Validators.required,Validators.minLength(6)]),
      'contrasena':new FormControl('',Validators.required),
    
});
userUpdate()
  {
      console.log(this.userForm.value,'updatedform');
      if(this.userForm.valid  )
      {
          this.service.updateData(this.userForm.value,this.data).subscribe((res)=>{
                console.log(res,'modificado');

                this.successmsg=res.message;
          })
      }else{
        this.errormsg='todo es requerido'
      }
  }
}
