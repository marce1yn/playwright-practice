import { test, expect, request } from '@playwright/test';
import { ReqresClient } from '../../api/clients/reqresClient';
import { UserApi } from '../../api/endpoints/userApi';

test.describe('API Testing with Reqres', () => {
    let userApi: UserApi;

    test.beforeAll(async ({ playwright }) => {
        const apiRequestContext = await request.newContext();
        const client = new ReqresClient(apiRequestContext);
        userApi = new UserApi(client);
    });

    test('Obtener un usuario', async () => {
        const response = await userApi.getUser(2);
        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log(body);
        expect(body.data.email).toBe('janet.weaver@reqres.in');
    });

});