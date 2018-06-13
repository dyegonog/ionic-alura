import { DateTime } from "ionic-angular";

export class Agendamento {
    nomeCliente: string;
    enderecoCliente: string;
    emailCliente: string;
    modeloCarro: string;
    precoTotal: number; 
    confirmado: boolean = false;
    enviado: boolean = false;
    data: string = DateTime.toString();
}