import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import  decode  from 'jwt-decode';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user={
    userName:'',
    pass:''
  }

  constructor( private service:ApiserviceService, private router:Router) { }

  data:any;
  errormsg:any;
  successmsg:any;

  ngOnInit(): void {
    
  }
  register(){
    if(this.userForm.valid)
    {
      console.log(this.userForm.value);
      this.service.createData(this.userForm.value).subscribe((res)=>{
        console.log(res,'res++=+');
        this.userForm.reset();
        this.successmsg=res.message;
        this.router.navigate(['login']);
      });

    }
    else{
      this.errormsg='todos los datos son requeridos';
    }
  }

  userForm =new FormGroup({
    'nombre':new FormControl('',Validators.required),
    'apellido':new FormControl('',Validators.required),
    
    'correo':new FormControl('',Validators.required),
    'userName':new FormControl('',Validators.required),
    
    'roleID':new FormControl('user'),
    'contrasena':new FormControl('',Validators.required),
    
});
}