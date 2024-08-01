import { Component, OnDestroy, OnInit } from '@angular/core';

import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { BusquedasService } from './../../../services/busquedas.service';
import { HospitalService } from './../../../services/hospital.service';
import { ModalImagenService } from './../../../services/modal-imagen.service';

import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;


  constructor(
    private busquedasService: BusquedasService,
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe( delay(100) )
      .subscribe( () => this.cargarHospitales() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        console.log(hospitales);
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospitales( hospital._id || '', hospital.nombre)
      .subscribe( resp => {
        console.log(resp);
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospitales( hospital._id || '')
      .subscribe( resp => {
        console.log(resp);
        Swal.fire('Borrado', hospital.nombre, 'success');
        this.cargarHospitales();
      });
  }

  async abrirSweetAlert(){
    const { value } = await Swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
      })

    if(value?.trim().length > 0){
      this.hospitalService.crearHospitales(value)
        .subscribe( (resp: any) => {
          this.hospitales.push(resp.hospital);
        })
    }
  }

  abrirModal(hospital: Hospital){
    this.modalImagenService.abrirModal( 'hospitales', hospital._id || '', hospital.img );
  }

  buscar( termino: string ) {
    if ( termino.length === 0 ) {
      return this.cargarHospitales();
    }

    this.cargando = true;
    this.busquedasService.buscar( 'hospitales', termino )
      .subscribe( resultados => {
        this.hospitales = resultados;
        this.cargando = false;
      });
  }


}
