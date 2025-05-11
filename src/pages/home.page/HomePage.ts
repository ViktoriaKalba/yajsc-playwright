import { Page, Locator } from '@playwright/test';

export class HomePage {
private page: Page;

  constructor(page: Page) {
    this.page = page;
}

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com');
}

  async selectProduct(productAlt: string) {
    await this.page.getByAltText(productAlt).click();
  }
}
