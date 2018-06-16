import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../../modelos/agendamento';
import { Observable } from 'rxjs/observable';

@Injectable()
export class AgendamentosServiceProvider {
  private url: string = 'http://localhost:8080/api/';

  constructor(private _http: HttpClient) { }

  agenda(agedamento: Agendamento) {
    return this._http
      .post(`${this.url}agendamento/agenda`, agedamento)
      .do(() => agedamento.enviado = true)
      .catch((err) => Observable.of(new Error('Falha no agendamento! Tente novamente mais tarde !')));
  }
}
