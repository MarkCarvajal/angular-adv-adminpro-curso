import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  usuario: Usuario;

  constructor(
    private usuarioService: UsuarioService
  ) {
    this.usuario = usuarioService.usuario;
  }

  logout(){
    this.usuarioService.logout();
  }
}
