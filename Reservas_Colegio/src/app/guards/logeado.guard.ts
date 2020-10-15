import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth'
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AuthService } from '../service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class LogeadoGuard implements CanActivate {
  dat:any;
  constructor(private afAuth:AngularFireAuth,
    private router:Router,
    private service:AuthService)
  {
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //alert(this.dat);
  //this.dat=;
    return this.service.buscar_uid_user_mysql(localStorage.getItem("tokem")).then(res=>{
      if((isNullOrUndefined(res) || res==false) && isNullOrUndefined(localStorage.getItem("tokem")))
      {
        this.router.navigate(['/login']);
        return false;
      }
      else
      {
        //window.location.reload();
        return true;
        
      }
    });
      
    
    /*return this.afAuth.authState.pipe(map(auth=>{
      //console.log(auth);
      if(isNullOrUndefined(auth))
      {
        this.router.navigate(['/login']);
        return false;
      }
      else
      {
        return true;
      }
    }))*/
      

  }
  
}
