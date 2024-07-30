import { ModalImagenService } from './../../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { Usuario } from './../../../models/usuario.model';
import { BusquedasService } from './../../../services/busquedas.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: any[] = [];
  public usuariosTemp: any[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe( delay(100) )
    .subscribe( img => this.cargarUsuarios() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        if( usuarios.length > 0 ){
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
        }
        this.cargando = false;
      });
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar( termino: string ) {
    if ( termino.length === 0 ) {
      this.usuarios = this.usuariosTemp;
      return;
    }

    this.cargando = true;
    this.busquedasService.buscar( 'usuarios', termino )
      .subscribe( resultados => {
        this.usuarios = resultados;
        this.cargando = false;
      });
  }

  eliminarUsuario( usuario: Usuario){

    if( usuario.uid === this.usuarioService.usuario.uid ){
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUSuario(usuario)
          .subscribe( () => {
            Swal.fire(
              'Usuario borrado',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            )
            this.cargarUsuarios();
          });
      }
    });
  }

  cambiarRole( usuario: Usuario ){
    this.usuarioService.guardarUsuario(usuario)
      .subscribe( resp => {
        console.log(resp);
      });
  }

  abrirModal( usuario: Usuario ){
    this.modalImagenService.abrirModal( 'usuarios', usuario.uid, usuario.img );
  }

}
