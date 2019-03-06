import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { TratarErro } from './tratarErro';
import { CadastroClientePesquisaComponent } from './cadastro-cliente-pesquisa/cadastro-cliente-pesquisa.component';
import { ClienteFiltro } from './cadastro-cliente-pesquisa/cadastro-cliente-pesquisa.model';
import { RegisterComponent } from './register/register.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { CpfValidadorComponent } from './componentes/utilitarios/cpf-validador.component';
import { RemoveCaracteresEspeciaisDirective } from './componentes/utilitarios/remove-caracteres-especiais.diretive';
import { CadastroClienteCrudComponent } from './cadastro-cliente-crud/cadastro-cliente-crud.component';
import { ClienteModel } from './cadastro-cliente-crud/cadastro-cliente.model';
import { CadastroClienteService } from './services/cadastro-cliente.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,    
    CpfValidadorComponent,
    RemoveCaracteresEspeciaisDirective,
    LoginComponent,
    CadastroClienteCrudComponent,
    CadastroClientePesquisaComponent,
    RegisterComponent
  ],
  exports: [

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    TratarErro,
    ClienteModel,
    ClienteFiltro,
    CadastroClienteService,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
