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
export class AuthGuard implements CanActivate{
  constructor(private authServie: AuthService, private router:Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authServie.isAuthenticated){
      return true;
    }
    else {
      this.router.navigateByUrl("/login")
      return false;
    }
  }

}
