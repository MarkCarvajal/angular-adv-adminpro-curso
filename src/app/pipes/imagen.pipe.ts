import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string = '', tipo: 'usuario' | 'hospital' | 'medico'): string {
    // Para la imagen del gmail que viene con referencia http solo retornar la imagen
    if(img?.includes('https')){
      return img;
    }
    // Para la imagen del usuario que viene cargada llamar al get
    else if(img){
      return `${base_url}/upload/${tipo}/${img}`
    }else{
      return `${base_url}/upload/${tipo}/no-image.png`
    }
  }

}
