import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClienteModel, TelefoneModel, EmailModel } from './cadastro-cliente.model';
import { CadastroClienteService } from '../services/cadastro-cliente.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subject } from 'rxjs';
import { TELA_ALTERACAO, TELA_VISUALIZACAO } from 'app/constantes';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'poc-cadastro-cliente-crud.component',
  templateUrl: './cadastro-cliente-crud.component.html'
})
export class CadastroClienteCrudComponent implements OnInit {
  
  arrayUF: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  listaTipoTelefone = [];
  listaTelefone: TelefoneModel[] = [];
  listaEmail: EmailModel[] = [];
  numeroTelefone: string;
  tipoTelefone: string;
  emailInput: string;
  numTelefoneisVazio = false;
  emailIsVazio = false;
  tipoTela: string;
  idCliente: number;
  cliente: ClienteModel = new ClienteModel();

  @ViewChild("f") formulario;

  @Input()
  public mascaraTelefone: Subject<string> = new Subject();

  constructor(public service: CadastroClienteService,
    public toastr: ToastrManager, public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.obterDadosIniciais(); 
  }

  private obterDadosIniciais() {
    this.idCliente = this.activatedRoute.snapshot.params['idCliente'];
    this.tipoTela = this.activatedRoute.snapshot.params['tipoTela'];
    this.tipoTelefone = 'RESIDENCIAL';
    this.listarTipoTelefone();
    if (this.tipoTela == TELA_ALTERACAO || this.tipoTela == TELA_VISUALIZACAO) {
      this.obter();
    }
  }

  private listarTipoTelefone() {
    this.service.getListaTipoTelefone().subscribe(listaTipoTelefone => {
      this.listaTipoTelefone = listaTipoTelefone;
    });
  }

  obter() {
    this.service.obter(this.idCliente).subscribe(
      cliente => {
        this.cliente = cliente;
      }
    )
  }

  pesquisarPorCep() {
    if (this.cliente.endereco.cep.length > 7) {
      this.service.obterEnderecoPorCep(this.cliente.endereco.cep).subscribe(
        endereco => {
          if (endereco != null) {
          this.cliente.endereco.logradouro = endereco.logradouro;
          this.cliente.endereco.complemento = endereco.complemento;
          this.cliente.endereco.bairro = endereco.bairro;
          this.cliente.endereco.cidade = endereco.cidade;
          this.cliente.endereco.uf = endereco.uf;
        } else {
          this.cliente.endereco.logradouro = null;
          this.cliente.endereco.complemento = null;
          this.cliente.endereco.bairro = null;
          this.cliente.endereco.cidade = null;
          this.cliente.endereco.uf = null;
        }
      }
      )
    }
  }

  clickIncluir() {
    if (this.formularioValido()) {
      this.service.salvar(this.cliente).subscribe(
        mensagem => {
          this.toastr.successToastr(mensagem, 'Sucesso');
          this.router.navigate(['/cadastroclientepesquisa'])
        }
      );
    }
  }

  clickAlterar() {
    if (this.formularioValido()) {
      this.service.atualizar(this.cliente).subscribe(
        mensagem => {
          this.toastr.successToastr(mensagem, 'Sucesso');
          this.router.navigate(['/cadastroclientepesquisa'])
        }
      );
    }
  }

  private formularioValido() {
    return this.formulario.valid && !this.listaEmailVazia() && !this.listaTelefoneVazia();
  }

  mudarMascaraTel() {
    this.verificarCampoTelefone();
    if (this.tipoTelefone == 'RESIDENCIAL' || this.tipoTelefone == 'COMERCIAL') {
      this.mascaraTelefone.next('(00)0000-0000')
    } else {
      this.mascaraTelefone.next('(00)00000-0000')
    }
  }

  adicionarTelefone() {
    if (this.numeroTelefone != "" && this.numeroTelefone != null) {
      let telefoneModel: TelefoneModel = new TelefoneModel();
      telefoneModel.numero = this.numeroTelefone;
      telefoneModel.tipoTelefone = this.tipoTelefone;
      this.cliente.telefones.push(telefoneModel);
      this.numeroTelefone = null;
      this.numTelefoneisVazio = false;
    } else {
      this.numTelefoneisVazio = true;
    }

  }

  removeTelefone() {
    this.cliente.telefones.pop();
  }

  removeEmail() {
    this.cliente.emails.pop();
  }

  adicionarEmail() {
    
    if (this.emailInput != "" && this.emailInput != null && this.EMAIL_REGEXP.test(this.emailInput)) {
      let emailModel: EmailModel = new EmailModel();
      emailModel.enderecoEmail = this.emailInput;
      this.cliente.emails.push(emailModel);
      this.emailInput = null;
      this.emailIsVazio = false;
    } else {
      this.emailIsVazio = true;
    }
  }

  verificarCampoTelefone() {
    if (this.numeroTelefone != "" && this.numeroTelefone != null) {
      this.numTelefoneisVazio = false;
    } else {
      this.numTelefoneisVazio = true;
    }
  }

  verificarCampoEmail() {
    if (this.emailInput != "" && this.emailInput != null && this.EMAIL_REGEXP.test(this.emailInput)) {
      this.emailIsVazio = false;
    } else {
      this.emailIsVazio = true;
    }
  }

  listaTelefoneVazia() {
    return this.cliente.telefones == null || this.cliente.telefones.length < 1;
  }

  listaEmailVazia() {
    return this.cliente.emails == null || this.cliente.emails.length < 1;
  }

  telaSomenteVisualizacao() {
    return this.tipoTela == TELA_VISUALIZACAO;
  }

  telaAlteracao() {
    return this.tipoTela == TELA_ALTERACAO;
  }

  telaInclusao() {
    return this.tipoTela == null;
  }

}
