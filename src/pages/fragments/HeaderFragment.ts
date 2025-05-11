import { Locator, Page } from '@playwright/test';

export class HeaderFragment {
  readonly navHome: Locator;
  readonly navCategories: Locator;
  readonly navContact: Locator;
  readonly navUserName: Locator;
  readonly navLanguage: Locator;  

  constructor(page: Page) {
    this.navHome = page.getByTestId('nav-home');
    this.navCategories = page.getByTestId('nav-categories');
    this.navContact = page.getByTestId('nav-contact');
    this.navUserName = page.getByTestId('nav-menu');
    this.navLanguage = page.getByTestId('language-select');
  }

  async getLoggedUserName() {
    return this.navUserName.textContent();
  }
}
