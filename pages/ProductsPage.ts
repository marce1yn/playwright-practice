import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async isLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.nth(0).click();
  }

  async getCartItemCount() {
    if (await this.cartBadge.isVisible()) {
      return parseInt(await this.cartBadge.textContent() || '0', 10);
    }
    return 0;
  }
}