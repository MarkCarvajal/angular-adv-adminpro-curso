import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

// instanacia la variable local dispuesat en el index.html
declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  logout(){
    localStorage.removeItem('token');

    google.accounts.id.revoke( 'mark.elev.carvajal@gmail.com', () => {
      this.router.navigateByUrl('/login');
    });
  }

  validarToken(): Observable<boolean>{
    google.accounts.id.initialize({
      client_id: "608547883073-m9dqdfphiblfgb06bkng7t97mhkhkc7c.apps.googleusercontent.com",
    });

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre,apellido, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, apellido, '', google, img, role, uid );
        localStorage.setItem('token', resp.token );
        return true;
      }),
      catchError( error => of(false) )
    );
  }

  crearUsuario(formData: RegisterForm) {
    console.log('crear service');

    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  actualizarPerfil( data: { email: string, nombre: string, apellido: string, role?: string}){

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.usuario.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        // Solo usa el tap para hacer un paso mas e insertar en el localstorage del navegador el token
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
}
