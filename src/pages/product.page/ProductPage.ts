import { Page, Locator, expect, test } from '@playwright/test';
import { ProductsFiltersFragments, SortOption } from './fragments/ProductsFiltersFragment';
import { HAND_TOOLS, OTHER, POWER_TOOLS } from '../../../typings/categories';

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
  readonly filters: ProductsFiltersFragments;
  readonly nextButton: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId('product-name');
    this.productPrice = page.getByTestId('product-price');    
    this.unitPrice = page.getByTestId('unit-price');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.addToFavoritesButton = page.getByTestId('add-to-favorites');
    this.alert = page.getByRole('alert', { name: 'Product added to shopping' });
    this.cartQuantity = page.getByTestId('cart-quantity');
    this.cartNavLink = page.getByTestId('nav-cart');
    this.productQuantity = page.getByTestId('product-quantity');
    this.productTitle = page.getByTestId('product-title');
    this.proceedButton = page.getByTestId('proceed-1');
    this.filters = new ProductsFiltersFragments(this.page);
    this.nextButton = page.getByRole('button', { name: 'Next' });
  }

async goto(): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com');
}

async getProductNamesOnCurrentPage(): Promise<string[]> {
  return await this.productName.allTextContents();
}

async getProductPricesOnCurrentPage(): Promise<number[]> {
  const productPrices = await this.productPrice.allTextContents(); 
  return productPrices.map((price) => parseInt(price.replace('$', '').trim()));
}

  async expectOnProductPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/product\//);
  }

  async expectProductDetails(name: string, price: string): Promise<void> {
    await expect(this.productName).toContainText(name);
    await expect(this.unitPrice).toContainText(price);
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToFavoritesButton).toBeVisible();
  }
  async addUnitToCart(quantity: string): Promise<void> {
    await this.addToCartButton.click();
    await expect(this.alert).toBeVisible();
    await expect(this.alert).toBeHidden({ timeout: 8000 });
    await expect(this.cartQuantity).toContainText((quantity));
  }
  async goToCartAndVerify(): Promise<void> {
    await this.cartNavLink.click();
    await expect(this.page).toHaveURL(/\/checkout/);
  }

  async verifyCartContents(quantity: string, title: string): Promise<void> {
    const value = await this.productQuantity.inputValue();
    expect(value).toBe(quantity);
    await expect(this.productTitle).toContainText(title);
  }

  async confirmProceedButtonVisible(): Promise<void> {
    await this.page.locator('body').click();
    await expect(this.proceedButton).toBeVisible();
  }

  async collectAllProductNames(): Promise<string[]> {
    const allTitles: string[] = [];
  
    while (true) {
      const titles = await this.getProductNamesOnCurrentPage();
      allTitles.push(...titles);
      const responsePromise = this.page.waitForResponse((response) =>
        response.url().includes('/products?sort=') 
      && response.status() === 200
      && response.request().method() === 'GET',
    );
      await this.nextButton.click();
      await responsePromise;                
      if (await this.isNextButtonDisabled()) {
      }
      return allTitles;
    }  
  }
  
  private async isNextButtonDisabled(): Promise<boolean> {
    // Отримуємо батьківський <li> елемент
    const parentLi = this.nextButton.locator('..'); // дві крапки означають піднятися на рівень вгору
    const classAttr = await parentLi.getAttribute('class');
  
    return classAttr?.includes('disabled') || false;
  }

  async collectAllProductPrices(): Promise<number[]> {
    const allPrices: number[] = [];
  
    while (true) {
      const prices = await this.getProductPricesOnCurrentPage();
      allPrices.push(...prices);
      const responsePromise = this.page.waitForResponse((response) =>
        response.url().includes('/products?sort=') 
      && response.status() === 200
      && response.request().method() === 'GET',
    )
      await this.nextButton.click();
      await responsePromise;                          
  
      if (await this.isNextButtonDisabled()) {
        return allPrices;
      }       
    }
  }  
  

  async expectSortedProducts(option: SortOption): Promise<void> {
    switch (option) {
      case 'Name (A - Z)': {
        const productNames = await this.collectAllProductNames(); // got sorted from UI
        const sortedProductNames = productNames.toSorted((a, b) => a.localeCompare(b)); //sorted in code
        const areProductSorted = productNames.join() === sortedProductNames.join();

        await test.info().attach(`Sorted products titles by ${option} on UI`, {
          body: JSON.stringify(productNames, null, 2),
          contentType: 'application/json',
        })
        await test.info().attach(`Sorted products titles by ${option} after calculation`, {
          body: JSON.stringify(sortedProductNames, null, 2),
          contentType: 'application/json',
        })

        expect(areProductSorted, `Products are not sorted from ${option}`).toBe(true);  
        break;
    }
      case 'Name (Z - A)':{
        const productNames = await this.collectAllProductNames(); // got sorted from UI
        const sortedProductNames = productNames.toSorted((a, b) => b.localeCompare(a)); //sorted in code
        const areProductSorted = productNames.join() === sortedProductNames.join();

        await test.info().attach(`Sorted products titles by ${option} on UI`, {
          body: JSON.stringify(productNames, null, 2),
          contentType: 'application/json',
        })
        await test.info().attach(`Sorted products titles by ${option} after calculation`, {
          body: JSON.stringify(sortedProductNames, null, 2),
          contentType: 'application/json',
        })

        expect(areProductSorted, `Products are not sorted from ${option}`).toBe(true);  
        break;
      }
      case 'Price (High - Low)':{
        const productPrices = await this.collectAllProductPrices(); // got sorted from UI
        const sortedProductPrices = productPrices.toSorted((a, b) => b - a); //sorted in code
        const areProductSorted = productPrices.join() === sortedProductPrices.join();

        await test.info().attach(`Sorted products titles by ${option} on UI`, {
          body: JSON.stringify(productPrices, null, 2),
          contentType: 'application/json',
        })
        await test.info().attach(`Sorted products titles by ${option} after calculation`, {
          body: JSON.stringify(sortedProductPrices, null, 2),
          contentType: 'application/json',
        })

        expect(areProductSorted, `Products are not sorted from ${option}`).toBe(true);  
        break;
      }
      case 'Price (Low - High)':{
        const productPrices = await this.collectAllProductPrices(); // got sorted from UI
        const sortedProductPrices = productPrices.toSorted((a, b) => a - b); //sorted in code
        const areProductSorted = productPrices.join() === sortedProductPrices.join();

        await test.info().attach(`Sorted products titles by ${option} on UI`, {
          body: JSON.stringify(productPrices, null, 2),
          contentType: 'application/json',
        })
        await test.info().attach(`Sorted products titles by ${option} after calculation`, {
          body: JSON.stringify(sortedProductPrices, null, 2),
          contentType: 'application/json',
        })

        expect(areProductSorted, `Products are not sorted from ${option}`).toBe(true);  
        break;        
      }
      default: throw new Error(`Unknown sort option: ${option}`);
    }
  }

  async expectFilteredProductsByCategory(categories: (HAND_TOOLS | POWER_TOOLS | OTHER)[]): Promise<void> {
    const productNames = await this.getProductNamesOnCurrentPage();
    console.log(`Product names: ${productNames}`);

    await test.info().attach(`Filtered products by categories - ${categories.join(', ')}`, {
      body: JSON.stringify(productNames, null, 2),
      contentType: 'application/json',
    });

    const unexpectedProducts = productNames.filter((productName) => {
      const unexpectedProductTitles = !categories.some((category) => productName.includes(category));      
      return unexpectedProductTitles;
    });
    console.log(`Unexpected product titles: ${unexpectedProducts}`);

    expect(
        unexpectedProducts.length,
        `Unexpected products found for categories: ${categories.join(', ')}.
            Unexpected: ${unexpectedProducts.join(', ')}.\nAll: ${productNames.join(', ')}`,
    ).toBe(0);
  }
  
  
}
