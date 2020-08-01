import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, delay, take, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { MiningComplex } from '../models/mining-complex';
import { Asset } from '../models/asset';

@Injectable({
  providedIn: 'root'
})
export class MiningComplexService {


  private readonly API_HOST = environment.apiHost;

  constructor(
    private http: HttpClient
  ) { }

  list = () => {
    return this.http.get<MiningComplex[]>(`${this.API_HOST}/complexos-minerarios`)
      .pipe(
        // delay(2000),
        // tap(console.log),
        take(1)
      );
  }

  listEquipments = () =>
    this.http.get<Asset[]>(`${this.API_HOST}/ativos/equipamentos`).pipe(
      map((element: any) => element.results),
      // tap(console.log),
      take(1)
    );

  // loadById = (id: number) => {
  //   return this.http.get<Example>(`${this.API_HOST}/${id}`).pipe(take(1));
  // }

  // private create = (example: Example) => {
  //   return this.http.post(this.API_HOST, example)
  //     .pipe(
  //       take(1)
  //     );
  // }

  // private update = (example: Example) => {
  //   return this.http.put(`${this.API_HOST}/${example.id}`, example).pipe(take(1));
  // }

  // save = (example: Example) => {
  //   if (example.id) {
  //     return this.update(example);
  //   }
  //   return this.create(example);
  // }
}
