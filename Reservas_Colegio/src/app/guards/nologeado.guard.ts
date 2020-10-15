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
export class NologeadoGuard implements CanActivate {
  dat:any;
  constructor(private afAuth:AngularFireAuth,
    private router:Router,
    private service:AuthService

    )
  {
    this.dat=localStorage.getItem("tokem");

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.service.buscar_uid_user_mysql(this.dat).then(res=>{
        if(isNullOrUndefined(this.dat) || res==false)
      {
        //window.location.reload();
        return true;
      }
      else
      {
        this.router.navigate(['/folder/Menu']);
        return false;
        
      }
      });
         
      
      
    /*return this.afAuth.authState.pipe(map(auth=>{
      //console.log(auth);
      if(isNullOrUndefined(auth))
      {
        return true;
      }
      else
      {
        this.router.navigate(['/folder/Menu']);
        return false;
      }
    }))*/
      

  }
  
}
