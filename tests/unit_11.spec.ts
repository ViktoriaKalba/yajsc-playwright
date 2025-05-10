import { test } from '@playwright/test';
import { ProductPage } from './pages/product.page/ProductPage';
import { dataSortOption } from '../test-data/sortOption';

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
})