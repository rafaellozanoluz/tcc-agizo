export class Experiencia {
  constructor(
    public id?: string,
    public local?: string,
    public cargo?: string,
    public descricao?: string,
    public datainicio?: string,
    public datafim?: string,
    public idusuario?: string,
    public datafimInvalid?: boolean
  ) {}
}
