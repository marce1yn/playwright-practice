import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test('Agregar producto al carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const saucedemo_url = 'https://www.saucedemo.com/';

  await loginPage.navigate(saucedemo_url);
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.isLoaded();

  await productsPage.addFirstProductToCart();
  const cartCount = await productsPage.getCartItemCount();
  expect(cartCount).toBe(1);
});