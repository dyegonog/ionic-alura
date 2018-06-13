import { DateTime } from "ionic-angular";

export class CadastroUsuario {
    nomeCliente: string;
    enderecoCliente: string;
    emailCliente: string;
    modeloCarro: string;
    precoTotal: number;
    data: string = DateTime.toString();
}