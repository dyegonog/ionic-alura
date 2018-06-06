import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { HttpErrorResponse } from '@angular/common/http';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { NavLifecycles } from '../../util/nav/nav-lifecycles';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifecycles {
  carros: Carro[] = [];

  constructor(public navCtrl: NavController,
    private _loadingControl: LoadingController,
    private _alertControl: AlertController,
    private _carrosService: CarrosServiceProvider) { }

  ionViewDidLoad(): void {
    let loading = this._loadingControl.create({
      content: 'Aguarde o carregamento ...'
    });
    loading.present();

    this._carrosService.lista()
      .subscribe(
        carros => {
          this.carros = carros;
          loading.dismiss();
        },
        (erro: HttpErrorResponse) => {
          loading.dismiss();
          this._alertControl.create({
            title: 'Falha na conexão',
            subTitle: 'Não foi possivel carregar a lista de carros, tente novamento mais tarde',
            buttons: [
              { text: 'ok' }
            ]
          }).present();
        });
  }

  seleciona(carro: Carro): void {
    this.navCtrl.push(EscolhaPage.name, { carroSelecionado: carro });
  }
}