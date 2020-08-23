import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiningProcessService {

  constructor() { }

  production = [
    {
      product: 'Minério de Ferro',
      production: '67,6 Mt',
      salesAmount: '61,6 Mt',
      period: '2º Trimestre de 2020',
    },
    {
      product: 'Níquel',
      production: '59,4 kt',
      salesAmount: '42,4 kt',
      period: '2º Trimestre de 2020',
    },
    {
      product: 'Cobre',
      production: '84,5 kt',
      salesAmount: '83,5 kt',
      period: '2º Trimestre de 2020',
    },
  ];

  productionObservable = new Observable(observer => {
    observer.next(this.production);
    observer.complete();
  });

}
