import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { CadastroUsuario } from '../../modelos/cadastro-usuario';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
  providers: [AgendamentosServiceProvider]
})
export class CadastroPage {
  carro: Carro;
  precoTotal: number;
  cadastroUsuario: CadastroUsuario;
  alerta: Alert;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _agendamentoService: AgendamentosServiceProvider) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal')
    this.cadastroUsuario = new CadastroUsuario();

  }

  agenda(): void {
    let mensagem: string;

    this.cadastroUsuario.modeloCarro = this.carro.nome;
    this.cadastroUsuario.precoTotal = this.precoTotal;

    this._agendamentoService.agenda(this.cadastroUsuario)
      .finally(() => this.criaAlerta(mensagem))
      .subscribe(
        sucesso => {
          mensagem = 'Agendamento realizado !';
        },
        erro => {
          mensagem = 'Falha no agendamento! Tente novamente mais tarde !';
        }
      );
  }

  criaAlerta(mensagem: string): void {
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