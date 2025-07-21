import { APIRequestContext } from '@playwright/test';

export class ReqresClient {
  readonly request: APIRequestContext;
  readonly baseURL: string = 'https://reqres.in/api';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async post(path: string, data: any) {
    return this.request.post(`${this.baseURL}${path}`, { data });
  }

  async get(path: string) {
    return this.request.get(`${this.baseURL}${path}`);
  }
}