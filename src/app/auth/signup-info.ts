export class SignUpInfo {
    name: string;
    login: string;
    email: string;
    role: string[];
    senha: string;
 
    constructor(name: string, login: string, email: string, senha: string) {
        this.name = name;
        this.login = login;
        this.email = email;
        this.senha = senha;
        this.role = ['funcionario'];
    }
}