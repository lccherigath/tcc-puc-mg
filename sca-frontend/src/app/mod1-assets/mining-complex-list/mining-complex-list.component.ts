import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subject, empty } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MiningComplexService } from 'src/app/shared/services/mining-complex.service';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { MiningComplex } from 'src/app/shared/models/mining-complex';

import * as L from 'leaflet';
import { BRAZIL_GEOJSON } from 'src/app/shared/components/leaflet-map/brazil-geojson';

@Component({
  selector: 'app-mining-complex-list',
  templateUrl: './mining-complex-list.component.html',
  styleUrls: ['./mining-complex-list.component.scss']
})
export class MiningComplexListComponent implements OnInit {

  constructor(
    private miningComplexService: MiningComplexService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastMessageService,
  ) { }

  miningComplexItems$: Observable<MiningComplex[]>;
  error$ = new Subject<boolean>();

  brazilGeoJSON = BRAZIL_GEOJSON;
  geojsonBounds: any;
  miningComplexItems: MiningComplex[];

  ngOnInit(): void {
    this.geojsonBounds = L.geoJSON(this.brazilGeoJSON).getBounds();
    this.miningComplexItems$ = this.miningComplexService.list()
      .pipe(
        map((data: any) => this.miningComplexItems = data.results),
        tap(console.log),
        catchError(error => {
          this.toastr.showMessage('error', '', 'Erro ao buscar dados no servidor');
          this.error$.next(true);
          return empty();
        })
      );
  }

  onEdit = (id: number) => {
    this.router.navigate(
      ['example-form-edit', id],
      // { relativeTo: this.activatedRoute } // USAR SE EXISTIREM ROTAS FILHAS
    );
  }

  // onRowSelect = (event) => {
  //   console.log(event.data);
  // }

}
