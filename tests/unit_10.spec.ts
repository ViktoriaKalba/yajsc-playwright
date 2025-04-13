import { test, expect } from '@playwright/test';

test('Test 1 - Verify login with valid credentials', async ({ page }) => {
  await page.goto('/auth/login');
  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.getByTestId('page-title')).toContainText('My account');
  await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
});

test('Test 2 - Verify user can view product details', async ({ page }) => {
    await page.goto('/');
    await page.getByAltText('Combination Pliers').click(); 
    await expect(page).toHaveURL(/\/product\//);
    await expect(page.getByTestId('product-name')).toContainText('Combination Pliers');
    await expect(page.getByTestId('unit-price')).toContainText('14.15');
    await expect(page.getByTestId('add-to-cart')).toBeVisible();
    await expect(page.getByTestId('add-to-favorites')).toBeVisible();

});

test('Test 3 - Verify user can add product to cart', async ({ page }) => {
    await page.goto('/');
    await page.getByAltText('Slip Joint Pliers').click(); 
    await expect(page).toHaveURL(/\/product\//);
    await expect(page.getByTestId('product-name')).toContainText('Slip Joint Pliers');
    await expect(page.getByTestId('unit-price')).toContainText('9.17');
    await page.getByTestId('add-to-cart').click();
    const alert = page.getByRole('alert', { name: 'Product added to shopping' });
    await expect(alert).toBeVisible();
    await expect(alert).toBeHidden({timeout: 8000});
    await expect(page.getByTestId('cart-quantity')).toContainText('1');
    await page.getByTestId('nav-cart').click();
    await expect(page).toHaveURL(/\/checkout/);
    const value = await page.getByTestId('product-quantity').inputValue();
    await expect(value).toBe('1');
    await expect(page.getByTestId('product-title')).toContainText('Slip Joint Pliers');
    await page.locator('body').click();
    await expect(page.getByTestId('proceed-1')).toBeVisible();
  });