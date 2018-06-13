import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CadastroUsuario } from '../../modelos/cadastro-usuario';

@Injectable()
export class AgendamentosServiceProvider {
  private url: string = 'http://localhost:8080/api/';

  constructor(private _http: HttpClient) { }

  agenda(agedamento: CadastroUsuario) {
    return this._http.post(`${this.url}agendamento/agenda`, agedamento);
  }
}
