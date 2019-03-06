import { Injectable } from "@angular/core";
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import { ClienteModel, EnderecoModel } from "../cadastro-cliente-crud/cadastro-cliente.model";
import { HttpClient } from "@angular/common/http";
import { POC_CADASTRO_API } from "app/app.api";
import { TratarErro } from "app/tratarErro";
import { ClienteFiltro } from "app/cadastro-cliente-pesquisa/cadastro-cliente-pesquisa.model";

@Injectable({
    providedIn: 'root'
  })
export class CadastroClienteService {

    constructor(private http: HttpClient, private tratarErro: TratarErro) {}

    public teste(cpf: string): Observable<ClienteModel> {
        return this.http.get<ClienteModel>(`${POC_CADASTRO_API}/cliente/`)
        .catch(error => this.tratarErro.handleError(error));
    }

    public getListaTipoTelefone(): Observable<any[]> {
        return this.http.get<any[]>(`${POC_CADASTRO_API}/cliente/tipoTelefone`,).catch(error => this.tratarErro.handleError(error));
    }

    public salvar(cliente: ClienteModel) {
        return this.http.post(`${POC_CADASTRO_API}/cliente/salvar`, cliente, {responseType: 'text'}) .catch(error => this.tratarErro.handleError(error));
    }

    public atualizar(cliente: ClienteModel) {
        return this.http.put(`${POC_CADASTRO_API}/cliente/atualizar/`,cliente, {responseType: 'text'}) .catch(error => this.tratarErro.handleError(error));
    }

    public excluir(id: number) {
        return this.http.delete(`${POC_CADASTRO_API}/cliente/excluir/${id}`, {responseType: 'text'}) .catch(error => this.tratarErro.handleError(error));
    }

    public pesquisar(cliente: ClienteFiltro): Observable<ClienteModel[]> {
        return this.http.post<ClienteModel[]>(`${POC_CADASTRO_API}/cliente/pesquisar`, cliente).catch(error => this.tratarErro.handleError(error));
    }

    public obter(id: number): Observable<ClienteModel> {
        return this.http.get<ClienteModel>(`${POC_CADASTRO_API}/cliente/obter/${id}`).catch(error => this.tratarErro.handleError(error));
    }

    public obterEnderecoPorCep(cep: string): Observable<EnderecoModel> {
        return this.http.get<EnderecoModel>(`${POC_CADASTRO_API}/cliente/cep/${cep}`).catch(error => this.tratarErro.handleError(error))
    }

}