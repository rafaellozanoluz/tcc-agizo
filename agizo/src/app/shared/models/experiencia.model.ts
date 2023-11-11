export class Experiencia {
  constructor(
    public id?: string,
    public local?: string,
    public cargo?: string,
    public descricao?: string,
    public datainicio?: Date,
    public datafim?: Date,
    public idusuario?: string
  ) {}
}
