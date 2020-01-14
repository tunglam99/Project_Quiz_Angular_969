import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {UserToken} from '../model/user-token';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  currentUser: UserToken;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe(
      currentUser => {
        this.currentUser = currentUser;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let hasRoleUser = false;
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      for (const role of roleList) {
        if (role.authority === 'ROLE_USER') {
          hasRoleUser = true;
          break;
        }
      }
      if (hasRoleUser) {
        return true;
      } else {
        this.authService.logout();
        this.router.navigate(['/', 'user'], { queryParams: {login: true}, queryParamsHandling: 'merge' } );
        return false;
      }
    } else {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
