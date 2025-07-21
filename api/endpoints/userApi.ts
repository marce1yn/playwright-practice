import { ReqresClient } from '../clients/reqresClient';

export class UserApi {
  readonly client: ReqresClient;

  constructor(client: ReqresClient) {
    this.client = client;
  }

  async login(email: string, password: string) {
    return this.client.post('/login', { email, password });
  }

  async getUser(id: number) {
    return this.client.get(`/users/${id}`);
  }
}