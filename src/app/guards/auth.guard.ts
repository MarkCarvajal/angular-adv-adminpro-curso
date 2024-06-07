import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
    ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("paso por aqui de pana en el CanACtivate");
    return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado => {
          if( !estaAutenticado ){
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
}
