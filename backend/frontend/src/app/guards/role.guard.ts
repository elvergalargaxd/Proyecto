import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';

import  decode  from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(
    private authService:ApiserviceService,
    public router:Router
  ){}
  canActivate(route:ActivatedRouteSnapshot):boolean{
    const expetedRole= route.data['expectedRole'];
    const token =localStorage.getItem('token')as string;
    let decodetoken:any = {};
    decodetoken = decode(token);
    console.log(decodetoken.roleId);
 
    if(!this.authService.isAuth()||decodetoken.roleId!==expetedRole){
      this.router.navigate(['login']);
      console.log('Usuario no autorizado para la vista');
      return false;
    }
       
    return true;
  }
  
}
