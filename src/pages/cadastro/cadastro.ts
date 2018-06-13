import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { CadastroUsuario } from '../../modelos/cadastro-usuario';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

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
    this.cadastroUsuario.modeloCarro = this.carro.nome;
    this.cadastroUsuario.precoTotal = this.precoTotal;
    this._agendamentoService.agenda(this.cadastroUsuario).subscribe(
      sucesso => {
        this.criaAlerta();
        this.alerta.setSubTitle('Agendamento realizado !!');
        this.alerta.present();
      },
      erro => {
        this.criaAlerta();
        this.alerta.setSubTitle('Falha no agendamento! Tente novamente mais tarde !!');
        this.alerta.present();
      }
    );
  }

  criaAlerta(): void {
    this.alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'ok' }]
    });
  }

}