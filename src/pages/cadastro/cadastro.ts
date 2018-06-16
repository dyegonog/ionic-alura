import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { Agendamento } from '../../modelos/agendamento';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
  providers: [AgendamentosServiceProvider]
})
export class CadastroPage {
  carro: Carro;
  precoTotal: number;
  agendamento: Agendamento;
  alerta: Alert;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _agendamentoService: AgendamentosServiceProvider,
    private _storage: Storage) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal')
    this.agendamento = new Agendamento();
  }

  agenda(): void {
    let mensagem: string;

    this.agendamento.modeloCarro = this.carro.nome;
    this.agendamento.precoTotal = this.precoTotal;

    this._agendamentoService.agenda(this.agendamento)
      .mergeMap((valor) => {
        let observable = this.salva(this.agendamento);

        if (valor instanceof Error) throw valor;

        return observable;
      })
      .finally(() => this.criaAlerta(mensagem))
      .subscribe(
        sucesso => {
          mensagem = 'Agendamento realizado !';
        },
        (err: Error) => {
          mensagem = err.message;
        }
      );
  }

  salva(agendamento: Agendamento) {
    let chave = `${agendamento.nomeCliente} ${agendamento.data.substr(0, 10)}`;
    let promise = this._storage.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }

  private criaAlerta(mensagem: string): void {
    this._alertCtrl.create({
      title: 'Aviso',
      subTitle: mensagem,
      buttons: [{
        text: 'ok',
        handler: () => { this.navCtrl.setRoot(HomePage) }
      }]
    }).present();
  }

}