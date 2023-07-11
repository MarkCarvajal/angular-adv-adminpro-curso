import { Component, OnDestroy } from '@angular/core';
import {
  Observable,
  Subscription,
  filter,
  interval,
  map,
  retry,
  take,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs!: Subscription;

  constructor() {
    // this.retornaObservble()
    //   .pipe(retry(1))
    //   .subscribe({
    //     next: (valor) => console.log('Sub', valor),
    //     error: (error) => console.warn('Error', error),
    //     complete: () => console.info('Obs terminado'),
    //   });

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(500).pipe(
      map((valor) => valor + 1),
      filter((valor) => (valor % 2 === 0 ? true : false))
      // take(10) // es la cantidad de respuestas que entrega, en este punto retorna 10 pares hasta el 20, pero si va de los primeros retornaria pares hasta el 10
    );
  }

  retornaObservble(): Observable<number> {
    return new Observable<number>((observer) => {
      let i = -1;
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i == 2) {
          // observer.error('i llego al valor de 2');
        }
      }, 1000);
    });
  }
}
