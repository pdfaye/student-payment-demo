import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable({providedIn:"root"})
export class AuthorizationGuard implements CanActivate{
  constructor(private authServie: AuthService, private router:Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authServie.isAuthenticated){
      let requiredRoles = route.data['roles'];
      let userRoles = this.authServie.roles;
      for (let role of userRoles){
        if (requiredRoles.includes(role)){
          return true;
        }
      }
      return false
    }
    else {
      this.router.navigateByUrl("/login")
      return false;
    }
  }

}
