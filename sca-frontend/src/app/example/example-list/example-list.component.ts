import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, empty, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { ExampleService } from 'src/app/shared/services/example.service';
import { Example } from 'src/app/shared/models/example';

@Component({
  selector: 'app-example-list',
  templateUrl: './example-list.component.html',
  styleUrls: ['./example-list.component.scss']
})
export class ExampleListComponent implements OnInit {

  // examples: Example[];
  examples$: Observable<Example[]>;
  error$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastMessageService,
    private exampleService: ExampleService
  ) { }

  ngOnInit(): void {
    // this.exampleService.list()
    //   .subscribe(data => this.examples = data);
    this.examples$ = this.exampleService.list()
      .pipe(
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

  showToastMessage = (typeMessage: string) => {
    switch (typeMessage) {
      case 'success':
        this.toastr.showMessage('success', 'Success', 'Success');
        break;
      case 'info':
        this.toastr.showMessage('info', 'info', 'info');
        break;
      case 'warning':
        this.toastr.showMessage('warning', 'warning', 'warning');
        break;
      case 'error':
        this.toastr.showMessage('error', 'error', 'error');
        break;
      default:
        this.toastr.showMessage('success', 'Success', 'Success');
        break;
    }
  }
}
