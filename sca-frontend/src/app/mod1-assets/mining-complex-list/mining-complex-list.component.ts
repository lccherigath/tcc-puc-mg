import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subject, empty } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MiningComplexService } from 'src/app/shared/services/mining-complex.service';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { MiningComplex } from 'src/app/shared/models/mining-complex';
import { ValueLabelsService } from 'src/app/shared/services/value-labels.service';

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
    // private router: Router,
    // private activatedRoute: ActivatedRoute,
    private toastr: ToastMessageService,
    private valueLabelsService: ValueLabelsService,
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
        // tap(console.log),
        catchError(error => {
          this.toastr.showMessage('error', '', 'Erro ao buscar dados no servidor');
          this.error$.next(true);
          return empty();
        })
      );
  }

  selectOperationalSituationLabel = (code: number) => this.valueLabelsService.operationalSituationFormat(code);

}
