import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, delay, take, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { MiningComplex } from '../models/mining-complex';
import { Asset } from '../models/asset';
import { Structure } from '../models/structure';
import { Event } from '../models/event';

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
        // delay(5000),
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

  loadById = (id: number, schedule?: boolean) => {
    const url = `${this.API_HOST}/complexos-minerarios/${id}`;
    return this.http.get<MiningComplex>(schedule ? url + '/agenda' : url).pipe(
      // tap(console.log),
      take(1)
    );
  }

  changeEvent = (event: Event) => this.http
    .post(`${this.API_HOST}/complexos-minerarios/${event.complexo_minerario_id}/agenda`, event).pipe(take(1));

  private create = (miningComplex: MiningComplex) => {
    return this.http
      .post(`${this.API_HOST}/complexos-minerarios`, miningComplex)
      .pipe(take(1));
  }

  private update = (miningComplex: MiningComplex) => {
    return this.http
      .put(
        `${this.API_HOST}/complexos-minerarios/${miningComplex.id}`,
        miningComplex
      )
      .pipe(take(1));
  }

  save = (miningComplex: MiningComplex) => {
    if (miningComplex.id) {
      return this.update(miningComplex);
    }
    return this.create(miningComplex);
  }

  updateEquipment = (equipment: any) => this.http
    .patch(`${this.API_HOST}/complexos-minerarios/equipamentos`, equipment)
    .pipe(take(1));

  private updateStructure = (structure: Structure) => this.http
    .patch(`${this.API_HOST}/complexos-minerarios/estruturas`, structure)
    .pipe(take(1));

  private addStructure = (structure: Structure) => this.http
    .post(`${this.API_HOST}/complexos-minerarios/estruturas`, structure)
    .pipe(take(1));

  saveStructure = (structure: Structure) =>
    structure.id ? this.updateStructure(structure) : this.addStructure(structure);

}
