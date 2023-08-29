export class User {
  constructor(
    public id?: number,
    public name?: string,
    public login?: string,
    public password?: string,
    public profile?: 'candidato' | 'recrutador' | 'administrador',

    public cpf?: string,
    public tel?: string,

    public number?: string,
    public street?: string,
    public neighborhood?: string,
    public city?: string,
    public state?: string,
    public cep?: string
  ) {}
}
