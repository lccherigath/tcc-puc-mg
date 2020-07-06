import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, delay, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Example } from './../models/example';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  private readonly API_HOST = `${environment.apiHost}exemplos`;

  constructor(
    private http: HttpClient
  ) { }

  list = () => {
    return this.http.get<Example[]>(this.API_HOST)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadById = (id: number) => {
    return this.http.get<Example>(`${this.API_HOST}/${id}`).pipe(take(1));
  }

  private create = (example: Example) => {
    return this.http.post(this.API_HOST, example)
      .pipe(
        take(1)
      );
  }

  private update = (example: Example) => {
    return this.http.put(`${this.API_HOST}/${example.id}`, example).pipe(take(1));
  }

  save = (example: Example) => {
    if (example.id) {
      return this.update(example);
    }
    return this.create(example);
  }
}
