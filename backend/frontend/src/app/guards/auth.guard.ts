import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService:ApiserviceService,
    private router:Router ){
    

  }
  canActivate():boolean{
    if(!this.authService.isAuth()){
      console.log('token no es valido');
      this.router.navigate(['login']);
      return false;
    }
      return true;
    }

  
}
