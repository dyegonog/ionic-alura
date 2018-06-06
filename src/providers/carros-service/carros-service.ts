import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Carro } from '../../modelos/carro';

@Injectable()
export class CarrosServiceProvider {
  constructor(private _http: HttpClient) { }

  lista(): Observable<Carro[]> {
    return this._http.get<Carro[]>('http://localhost:8080/api/carro/listaTodos');
  }
}