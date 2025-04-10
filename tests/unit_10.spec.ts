import { test, expect } from '@playwright/test';

test('Test 1 - Verify login with valid credentials', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
  await page.locator('[data-test="password"]').fill('welcome01');
  await page.locator('[data-test="login-submit"]').click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
});

test('Test 2 - Verify user can view product details', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByAltText('Combination Pliers').click(); 
    await expect(page).toHaveURL(/\/product\//);
    await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
    await expect(page.locator('[data-test="unit-price"]')).toContainText('14.15');
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
    await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible();

});

test('Test 3 - Verify user can add product to cart', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByAltText('Slip Joint Pliers').click(); 
    await expect(page).toHaveURL(/\/product\//);
    await expect(page.locator('[data-test="product-name"]')).toContainText('Slip Joint Pliers');
    await expect(page.locator('[data-test="unit-price"]')).toContainText('9.17');
    await page.locator('[data-test="add-to-cart"]').click();
    const alert = page.getByRole('alert', { name: 'Product added to shopping' });
    await expect(alert).toBeVisible();
    await expect(alert).not.toBeVisible({timeout: 8000});
    await expect(page.locator('[data-test="cart-quantity"]')).toContainText('1');
    await page.locator('[data-test="nav-cart"]').click();
    await expect(page).toHaveURL(/\/checkout/);
    const value = await page.locator('[data-test="product-quantity"]').inputValue();
    await expect(value).toBe('1');
    await expect(page.locator('[data-test="product-title"]')).toContainText('Slip Joint Pliers');
    await page.locator('body').click();
    await expect(page.locator('[data-test="proceed-1"]')).toBeVisible();
  });