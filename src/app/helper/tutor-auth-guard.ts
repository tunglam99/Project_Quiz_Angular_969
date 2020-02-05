import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {UserToken} from '../model/user-token';
import {UserService} from '../service/user.service';
import {AuthenticationService} from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TutorAuthGuard implements CanActivate, CanActivateChild, CanLoad{
  currentUser: UserToken;
  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let hasRoleTutor = false;
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      for (const role of roleList) {
        if (role.authority === 'ROLE_TUTOR') {
          hasRoleTutor = true;
          break;
        }
      }
      if (hasRoleTutor) {
        return true;
      } else {
        this.authService.logout();
        this.router.navigate(['/', 'tutor'], { queryParams: {login: true}, queryParamsHandling: 'merge' } );
        return false;
      }
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/', 'tutor', 'login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      let hasRoleTutor = false;
      for (const role of roleList) {
        if (role.authority === 'ROLE_TUTOR') {
          hasRoleTutor = true;
          break;
        }
      }
      return hasRoleTutor;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/', 'tutor', 'login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
  canLoad(route: Route, segments: UrlSegment[]) {
    return true;
  }
}
