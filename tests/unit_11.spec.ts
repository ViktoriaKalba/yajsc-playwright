import { test } from '@playwright/test';
import { ProductPage } from '../src/pages/product.page/ProductPage';
import { dataSortOption } from '../test-data/dataSortOption';
import { dataCategories } from '../test-data/dataCategiries';

dataSortOption.forEach(({sortBy}) => {
  test(`Product sorting by "${sortBy}" with pagination`, async({page}) => {
    const productPage = new ProductPage(page);
      await test.step('Navigate to the products page', async() => {
      await productPage.goto();
    });
    await test.step('Select sorting option', async() => {
      await productPage.filters.selectSortOption(sortBy);
    });
    await test.step('Verify products are sorted', async() => {
      await productPage.expectSortedProducts(sortBy);    
    });
  })
});

dataCategories.forEach(({ categoriesToSelect, expectedCategories }) => {
  test(`Verify user can filter products by "${categoriesToSelect.join('/')}" categories`, async ({ page }) => {
    const productPage = new ProductPage(page);

    await test.step('Open product page', async () => {
      await productPage.goto();
    });

    await test.step(`Select category`, async () => {
      for (const category of categoriesToSelect) {
        await productPage.filters.selectCategory(category);
      }
    });

    await test.step('Verify selected categories', async () => {
      await productPage.expectFilteredProductsByCategory(expectedCategories);
    });
  });
});