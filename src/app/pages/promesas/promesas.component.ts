import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  ngOnInit(): void {
    this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
    });

    // const promesa = new Promise((resolve, rejects) => {
    //   if (false) {
    //     resolve('Hola mundo');
    //   } else {
    //     rejects('Algo salio mal');
    //   }
    // });
    // console.log('Fin del init');
    // promesa
    //   .then((mensaje) => {
    //     console.log('termine', mensaje);
    //   })
    //   .catch((error) => console.log('Error en mi promesa', error));
  }

  getUsuarios() {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });
  }
}
