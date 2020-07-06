import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { MiningComplexService } from 'src/app/shared/services/mining-complex.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-equipments-add',
  templateUrl: './equipments-add.component.html',
  styleUrls: ['./equipments-add.component.scss']
})
export class EquipmentsAddComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(
    private miningComplexService: MiningComplexService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.miningComplexService.listEquipments()
      .pipe(take(1));
  }

}
