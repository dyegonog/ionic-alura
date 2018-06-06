import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { Acessorio } from '../../modelos/acessorio';
import { CadastroPage } from '../cadastro/cadastro';

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {
  carro: Carro;
  acessorios: Acessorio[] = [];
  private _precoTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carro = this.navParams.get('carroSelecionado');
    this._precoTotal = this.carro.preco;

    this.acessorios = [
      { nome: 'Ar-Condicionado', preco: 400 },
      { nome: 'MP3-Player', preco: 900 },
      { nome: 'Roda Esportiva', preco: 200 }
    ];
  }

  atualizaTotal(toogle: boolean, precoAcessorio: number): void {
    toogle ?
      this._precoTotal += precoAcessorio :
      this._precoTotal -= precoAcessorio
  }

  avancaCadastro(): void {
    this.navCtrl.push(CadastroPage.name, {
      carroSelecionado: this.carro, 
      precoTotal: this._precoTotal
    });
  }

  get precoTotal() {
    return this._precoTotal;
  }
}