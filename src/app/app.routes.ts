import {Routes} from '@angular/router'
import { LoginComponent } from './login/login.component';
import { CadastroClientePesquisaComponent } from './cadastro-cliente-pesquisa/cadastro-cliente-pesquisa.component';
import { RegisterComponent } from './register/register.component';
import { CadastroClienteCrudComponent } from './cadastro-cliente-crud/cadastro-cliente-crud.component';

export const ROUTES: Routes = [
  {path: '', component: LoginComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'cadastroclientecrud', component: CadastroClienteCrudComponent},
  {path: 'cadastroclientecrud/:idCliente/:tipoTela', component: CadastroClienteCrudComponent},
  {path: 'signup',component: RegisterComponent},
  {path: 'cadastroclientepesquisa', component: CadastroClientePesquisaComponent}
]
