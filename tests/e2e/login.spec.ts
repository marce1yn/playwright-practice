import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { MenuComponent } from '../../pages/MenuComponents';

test.describe('Login tests', () => {

    const saucedemo_url = 'https://www.saucedemo.com/';
    
    test('Login exitoso y logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const menu = new MenuComponent(page);

        await loginPage.navigate(saucedemo_url);
        await loginPage.login('standard_user', 'secret_sauce');
        await productsPage.isLoaded();

        await menu.logout();
        await expect(page).toHaveURL(saucedemo_url);
    });

    test('Login fallido con usuario inválido', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate(saucedemo_url);
        await loginPage.login('invalid_user', 'wrong_password');
        await loginPage.assertLoginError('Username and password do not match');
    });

    test('Login fallido con usuario bloqueado', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate(saucedemo_url);
        await loginPage.login('locked_out_user', 'secret_sauce');
        await loginPage.assertLoginError('Sorry, this user has been locked out.');
    });
});