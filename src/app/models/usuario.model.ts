import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public uid: string,
    public apellido?: string,
    public password?: string,
    public google?: boolean,
    public img?: string,
    public role?: string,
  ){}

  get imagenUrl(){
    // Para la imagen del gmail que viene con referencia http solo retornar la imagen
    if(this.img?.includes('https')){
      return this.img;
    }

    // Para la imagen del usuario que viene cargada llamar al get
    if(this.img){
      return `${base_url}/upload/usuarios/${this.img}`
    }else{
      return `${base_url}/upload/usuarios/no-image.png`
    }
  }
}
