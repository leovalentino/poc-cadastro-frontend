export class CpfCnpjUtil {

    static pesoCnpj = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    static pesoCpf = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    public static validarCpf(cpfAvalidar: string): boolean {
        if (cpfAvalidar == null) return false;
        let cpf = cpfAvalidar.replace(/\D+/g,'');
        if (cpf.length != 11) return false;
        let digito1 = this.calcularDigito(cpf.substring(0, 9), this.pesoCpf);
        let digito2 = this.calcularDigito(cpf.substring(0, 9) + digito1, this.pesoCpf);
        return cpf == cpf.substring(0, 9) + digito1.toString() + digito2.toString();
    }

    public static validarCnpj(cnpjAValidar: string): boolean {
        if (cnpjAValidar == null) return false;
        let cnpj = cnpjAValidar.replace(/\D+/g,'');
        if (cnpj.length != 14) return false;
        let digito1 = this.calcularDigito(cnpj.substring(0, 12), this.pesoCnpj);
        let digito2 = this.calcularDigito(cnpj.substring(0, 12) + digito1, this.pesoCnpj);
        return cnpj == cnpj.substring(0, 12) + digito1.toString() + digito2.toString();
    }

    private static calcularDigito(str: string, peso: number[]): number {
        let soma = 0;
        for (let i = str.length - 1, digito; i >= 0; i--) {
            digito = Number(str.substring(i, i + 1));
            soma += digito * peso[peso.length - str.length + i];
        }
        soma = 11 - soma % 11;
        return soma > 9 ? 0 : soma;
    }
}