import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ApiserviceService } from '../apiservice.service';
import  decode  from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user={
    userName:'',
    pass:''
  }
  

  constructor( private authService:ApiserviceService, private router:Router) { }

  data:any;
   
  ngOnInit(): void {
  }
  logIn(){
    
    console.log(this.user);
    this.authService.singin(this.user).subscribe((res:any) =>{
      
      console.log(res);
      localStorage.setItem('token',res.token);
      //this.router.navigate(['']);
      const token =localStorage.getItem('token') as string;
      let decodetoken:any = {};
      decodetoken = decode(token);
    
      if(decodetoken.roleId=="user")
      {
        this.router.navigate(['estudiante']);
      }
      if(decodetoken.roleId=="admin")
      {
        this.router.navigate(['administrar/crearEstudiante']);
      }
      if(decodetoken.roleId=="docente")
      {
        this.router.navigate(['docente']);
      }
      console.log(decodetoken.roleId);

    })

   
  }

}