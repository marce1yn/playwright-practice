import { ReqresClient } from '../clients/reqresClient';

export class UserApi {
  readonly client: ReqresClient;

  constructor(client: ReqresClient) {
    this.client = client;
  }

  async getUser(id: number) {
    return this.client.get(`/users/${id}`);
  }
}