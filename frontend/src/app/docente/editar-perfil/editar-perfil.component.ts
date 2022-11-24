import { Component, Input, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginComponent} from '../../login/login.component';
import  decode  from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

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
            domicilio:res.data[0].domicilio,
            pais:res.data[0].pais,
            ciudad:res.data[0].ciudad,
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
      'domicilio':new FormControl('',Validators.required),
      'ciudad':new FormControl('',Validators.required),
      'pais':new FormControl('',Validators.required),
    
});
userUpdate()
  {
      
      if(this.userForm.valid) 
      {
        console.log(this.userForm.value);
        Swal.fire({
          title: 'Desea guardar los datos?',
          text: "Esta seguro de los datos!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',      
         confirmButtonText: `Ingresar`,
         }).then((result) => {
         if (result.isConfirmed) {
    
         
          this.service.updateData(this.userForm.value,this.data).subscribe( res => {
            
          // console.log(res, location.reload());
          Swal.fire(
            'Datos Ingresados!',
            'Los datos fueron ingresados.',
            'success'
          )
           });
         }
       });   
 
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Todos los datos son requeridos!'
        })
        this.errormsg='todos los datos son requeridos';
      }

  }
}
