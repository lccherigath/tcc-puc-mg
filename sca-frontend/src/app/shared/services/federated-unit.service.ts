import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FederatedUnitService {

  private readonly IBGE_API = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(
    private http: HttpClient
  ) { }

  getUF = () => this.http.get(`${this.IBGE_API}/estados`).pipe(take(1));

  getCity = (ufId) => this.http.get(`${this.IBGE_API}/estados/${ufId}/municipios`).pipe(take(1));

  getCityGeoJSON = (ufId) => this.http.get(
    `https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-${ufId}-mun.json`
  ).pipe(take(1));

}
