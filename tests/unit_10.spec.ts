import { test, expect } from '@playwright/test';
import { LoginPage } from './objects/LoginPage';
import { HomePage } from './objects/HomePage';
import { ProductPage } from './objects/ProductPage';

test('Test 1 - Verify login with valid credentials', async ({ page }) => {
const loginPage = new LoginPage (page);

await loginPage.goto();
await loginPage.fillLoginForm('customer@practicesoftwaretesting.com', 'welcome01');

const loggedUserName = await loginPage.header.getLoggedUserName();
await loginPage.urlOnAccountPage();
await loginPage.getMainHeadingText('My account');
await expect(loggedUserName).toContain('Jane Doe');
});


test('Test 2 - Verify user can view product details', async ({ page }) => {
const homePage = new HomePage (page);
const productPage = new ProductPage(page);

await homePage.goto();
await homePage.selectProduct('Combination Pliers')
await productPage.expectOnProductPage();
await productPage.expectProductDetails('Combination Pliers', '14.15'); 
});

test('Test 3 - Verify user can add product to cart', async ({ page }) => {
    const homePage = new HomePage (page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await homePage.selectProduct('Slip Joint Pliers')
    await productPage.expectOnProductPage();
    await productPage.expectProductDetails('Slip Joint Pliers', '9.17'); 
    await productPage.addUnitToCart('1');
    await productPage.goToCartAndVerify();
    await productPage.verifyCartContents('1', 'Slip Joint Pliers');
    await productPage.confirmProceedButtonVisible();

  });