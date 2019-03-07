import { Injectable } from "@angular/core";

@Injectable()
export class ClienteModel {

    idCliente: number;
    nome: string;
    cpf: string;
    endereco: EnderecoModel = new EnderecoModel();
    telefones = [];
    tipoTelefone: string;
    emails = [];

}

export class EnderecoModel {

    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    uf: string;
    cidade: string;

}

export class TelefoneModel {

    tipoTelefone: string;
    numero: string;
    mascaraTelefone: string;
    
}

export class EmailModel {

    codEmail: number;
    enderecoEmail: string;

}