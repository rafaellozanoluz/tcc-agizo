import { MODEL } from '..';

export class Curriculo {
  constructor(
    public id?: string,
    public resumo?: string,
    public cabecalho?: MODEL.Cabecalho,
    public formacao?: MODEL.Formacao[],
    public experiencia?: MODEL.Experiencia[],
    public adicionais?: MODEL.Adicionais[],
    public habilidades?: MODEL.Habilidades[]
  ) {}
}
