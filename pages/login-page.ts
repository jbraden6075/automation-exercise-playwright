// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';
import { randomAlphabeticString } from '../helpers/global-functions';


// Define the LoginPage class to encapsulate login functionality
export interface LoginCredentials {
    emailAddress?: string;
    password?: string;
}

export interface SignupCredentials {
    name?: string;
    emailAddress?: string; 
}

export class LoginPage {
    // Define locators for the login page elements
    private readonly emailAddressInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly signupNameInput: Locator;
    private readonly signupEmailAddressInput: Locator;
    private readonly signupButton: Locator;

    // Constructor initializes the page and locators
    constructor(private readonly page: Page) {
        this.emailAddressInput = page.locator('input[data-qa="login-email"]');
        this.passwordInput = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.locator('button[data-qa="login-button"]');
        this.signupNameInput = page.locator('input[data-qa="signup-name"]');
        this.signupEmailAddressInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');
    }

    // Perform login with the provided credentials
    async loginValid(
        emailAddress: LoginCredentials['emailAddress'] = 'asdf2@asdf.com',
        password: LoginCredentials['password'] = 'playwrightautomation'
    ): Promise<void> {
    
        // Fill in the email and password fields, then click the login button
        await this.emailAddressInput.fill(emailAddress);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    
        // Wait for the URL to change to the home page after successful login
        await this.page.waitForURL('https://automationexercise.com');
    }

    async loginInvalidPassword(
        emailAddress: LoginCredentials['emailAddress'] = 'asdf2@asdf2.com',
        password: LoginCredentials['password'] = 'asdf'
    ): Promise<void> {

        // Fill in the email and password fields, then click the login button
        await this.emailAddressInput.fill(emailAddress);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginInvalidEmail(
        emailAddress: LoginCredentials['emailAddress'] = 'asdf@asdf.com',
        password: LoginCredentials['password'] = 'playwrightautomation'
    ): Promise<void> {
        
        // Fill in the email and password fields, then click the login button
        await this.emailAddressInput.fill(emailAddress);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async startNewUserSignup(
        name: SignupCredentials['name'] = 'asdf',
        emailAddress: SignupCredentials['emailAddress'] = `${randomAlphabeticString(6)}` + '@asdf.com'
    ): Promise<void> {
        await this.page.waitForTimeout(5000); // Seems to be a race condition between page load and element click.
        await this.signupNameInput.fill(name);
        await this.signupEmailAddressInput.fill(emailAddress);

        console.log(emailAddress); // Saving the email address in case we need it for debugging.
        
        await this.signupButton.click();
        await this.page.waitForURL('https://automationexercise.com/signup');
    }
}