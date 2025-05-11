import {Page, Locator, expect} from '@playwright/test';
import { HeaderFragment } from '../fragments/HeaderFragment';

export class LoginPage {
    private page: Page;
    private loginInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private mainHeading: Locator; 
    readonly header: HeaderFragment;

    constructor (page: Page) {
        this.page = page;
        this.loginInput = page.getByTestId('email'); 
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
        this.mainHeading = page.getByTestId('page-title'); 
        this.header = new HeaderFragment(page);
    }
    async goto() {
        await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    }
    async fillLoginForm(login: string, password: string): Promise <void> {
        await this.loginInput.fill(login);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }   
    async getMainHeadingText(title: string) {
        await expect(this.mainHeading).toContainText(title);
    }
    async urlOnAccountPage() {
        await expect(this.page).toHaveURL(/\/account/);
    }
    
}

