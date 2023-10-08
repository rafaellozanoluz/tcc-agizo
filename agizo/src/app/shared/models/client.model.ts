import { MODEL } from '..';

export class Client extends MODEL.User {
  constructor(
    public id?: string,
    public name?: string,
    public cpf?: string,
    public email?: string,
    public password?: string,
    public cellphone?: string,
    public type?: string
  ) {
    super(id, name, cpf, email, password, cellphone, type);
  }
}
