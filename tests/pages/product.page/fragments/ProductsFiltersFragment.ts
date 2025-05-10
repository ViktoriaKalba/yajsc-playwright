import { Locator, Page } from "@playwright/test";

export type SortOption = 'Name (A - Z)' | 'Name (Z - A)' | 'Price (High - Low)' | 'Price (Low - High)';
export class ProductsFiltersFragments {
    readonly page: Page;
    private readonly root: Locator;
    readonly sortDropDown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = page.getByTestId('filters');
        this.sortDropDown = this.root.getByTestId('sort');
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
}


