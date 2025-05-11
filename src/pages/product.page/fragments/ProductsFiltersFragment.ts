import { Locator, Page } from "@playwright/test";
import { CATEGORIES, HAND_TOOLS, OTHER, POWER_TOOLS } from "../../../../typings/categories";

export type SortOption = 'Name (A - Z)' | 'Name (Z - A)' | 'Price (High - Low)' | 'Price (Low - High)';
export class ProductsFiltersFragments {
    readonly page: Page;
    private readonly root: Locator;
    readonly sortDropDown: Locator;
    readonly categories: Locator

    constructor(page: Page) {
        this.page = page;
        this.root = page.getByTestId('filters');
        this.sortDropDown = this.root.getByTestId('sort');
        this.categories = this.root.locator('.checkbox')
      }

    async selectSortOption(option: SortOption): Promise<void> {    
        const responsePromise = this.page.waitForResponse((response) =>
          response.url().includes('/products?sort=') 
            && response.status() === 200
            && response.request().method() === 'GET',
        );

        await this.sortDropDown.selectOption({label: option});
        await responsePromise;    
    }

    async selectCategory(category: HAND_TOOLS | POWER_TOOLS | OTHER | CATEGORIES): Promise<void> {
      const responsePromise = this.page.waitForResponse((response) =>
        response.url().includes('/products?between=price')
          && response.status() === 200
          && response.request().method() === 'GET',
      );
      await this.categories.getByText(category).check();
      await responsePromise;
  }
}


