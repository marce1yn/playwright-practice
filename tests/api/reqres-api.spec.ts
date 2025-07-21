import { test, expect, request } from '@playwright/test';
import { ReqresClient } from '../../api/clients/reqresClient';
import { UserApi } from '../../api/endpoints/userApi';

test.describe('API Testing with Reqres', () => {
    let userApi: UserApi;

    test.beforeAll(async ({ playwright }) => {
        // const apiRequestContext = await request.newContext();

        const apiRequestContext = await request.newContext({
            baseURL: 'https://reqres.in/api',
            extraHTTPHeaders: {
                'x-api-key': 'reqres-free-v1',
            },
        });

        const client = new ReqresClient(apiRequestContext);
        userApi = new UserApi(client);
    });

    test('Login exitoso', async () => {
        const response = await userApi.login('eve.holt@reqres.in', 'cityslicka');
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.token).toBeDefined();
    });



    test('Obtener un usuario', async () => {
        const response = await userApi.getUser(2);
        expect(response.status()).toBe(200);
        const body = await response.json();
        // console.log(body);
        expect(body.data.email).toBe('janet.weaver@reqres.in');
    });



});