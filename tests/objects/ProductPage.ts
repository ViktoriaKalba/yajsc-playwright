import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly unitPrice: Locator;
  readonly addToCartButton: Locator;
  readonly addToFavoritesButton: Locator;
  readonly alert: Locator;
  readonly cartQuantity: Locator;
  readonly cartNavLink: Locator;
  readonly productQuantity: Locator;
  readonly productTitle: Locator;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId('product-name');
    this.unitPrice = page.getByTestId('unit-price');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.addToFavoritesButton = page.getByTestId('add-to-favorites');
    this.alert = page.getByRole('alert', { name: 'Product added to shopping' });
    this.cartQuantity = page.getByTestId('cart-quantity');
    this.cartNavLink = page.getByTestId('nav-cart');
    this.productQuantity = page.getByTestId('product-quantity');
    this.productTitle = page.getByTestId('product-title');
    this.proceedButton = page.getByTestId('proceed-1');
  }

  async expectOnProductPage() {
    await expect(this.page).toHaveURL(/\/product\//);
  }

  async expectProductDetails(name: string, price: string) {
    await expect(this.productName).toContainText(name);
    await expect(this.unitPrice).toContainText(price);
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToFavoritesButton).toBeVisible();
  }
  async addUnitToCart(quantity: string) {
    await this.addToCartButton.click();
    await expect(this.alert).toBeVisible();
    await expect(this.alert).toBeHidden({ timeout: 8000 });
    await expect(this.cartQuantity).toContainText((quantity));
  }
  async goToCartAndVerify() {
    await this.cartNavLink.click();
    await expect(this.page).toHaveURL(/\/checkout/);
  }

  async verifyCartContents(quantity: string, title: string) {
    const value = await this.productQuantity.inputValue();
    expect(value).toBe(quantity);
    await expect(this.productTitle).toContainText(title);
  }

  async confirmProceedButtonVisible() {
    await this.page.locator('body').click();
    await expect(this.proceedButton).toBeVisible();
  }
}
