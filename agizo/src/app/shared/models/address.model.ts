export class Address {
  constructor(
    public cep?: string,
    public logradouro?: string,
    public complemento?: string,
    public bairro?: string,
    public localidade?: string,
    public uf?: string
  ) {}
}
