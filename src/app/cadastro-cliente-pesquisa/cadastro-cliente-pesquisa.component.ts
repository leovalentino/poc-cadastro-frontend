import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TELA_ALTERACAO, TELA_VISUALIZACAO } from 'app/constantes';
import { ClienteFiltro } from './cadastro-cliente-pesquisa.model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subject } from 'rxjs';
import { TokenStorageService } from 'app/auth/token-storage.service';
import { CadastroClienteService } from 'app/services/cadastro-cliente.service';
import { ClienteModel } from 'app/cadastro-cliente-crud/cadastro-cliente.model';

@Component({
  selector: 'poc-cadastro-cliente-pesquisa',
  templateUrl: './cadastro-cliente-pesquisa.component.html'
})
export class CadastroClientePesquisaComponent implements OnInit {

  listaCliente = [];
  idCliente: number;
  private roles: string[];
  private authority: string;
  public isUsuarioAdministrador = false;

  @Input()
  public mascaraTelefone: Subject<string> = new Subject();

  constructor(public cliente: ClienteFiltro, public service: CadastroClienteService, public router: Router,
              public toastr: ToastrManager, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.pesquisar();
    this.usuarioNaoPossuiPermissaoAdministrador();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ADMINISTRADOR') {
          this.authority = 'administrador';
          return false;
        }
        this.authority = 'funcionario';
        return true;
      });
    }
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }

  usuarioNaoPossuiPermissaoAdministrador() {
     this.isUsuarioAdministrador = this.tokenStorage.getAuthorities().indexOf('ADMINISTRADOR') != -1;
  }

  pesquisar() {
    this.service.pesquisar(this.cliente).subscribe(
      listaResultado => {
        this.listaCliente = listaResultado;
      }
    )
  }

  pesquisarPorEventoCPF() {
    this.realizarBusca();
  }

  realizarBusca() {
    this.service.pesquisar(this.cliente).subscribe(
      listaResultado => {
        this.listaCliente = listaResultado;
      }
    )
  }

  excluir() {
    this.service.excluir(this.idCliente).subscribe(
      mensagem => {
        this.toastr.successToastr(mensagem, 'Sucesso');
        this.pesquisar();
      }
    )
  }

  prepararExclusao(cliente: ClienteModel) {
    this.idCliente = cliente.idCliente;
  }

  irParaTelaAlteracao(cliente: ClienteModel) {
    this.router.navigate(['/cadastroclientecrud', cliente.idCliente, TELA_ALTERACAO]);
  }

  irParaTelaVisuzalizacao(cliente: ClienteModel) {
    this.router.navigate(['/cadastroclientecrud', cliente.idCliente, TELA_VISUALIZACAO]);
  }

}
