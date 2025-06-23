import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page.ts';
import { RegistrationPage } from '../pages/registration-page.ts';
import { AccountCreatedPage } from '../pages/account-created.ts';


test.beforeEach(async ({page}) => {
    // Navigate to the home page before each test
    await page.goto('https://automationexercise.com/login');
})

test.describe('Registration', () => { 
    test('Successfully register a user with only required fields', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.startNewUserSignup()
        
        const registrationPage = new RegistrationPage(page);

        await registrationPage.createNewUser(false);

        const accountCreatedPage = new AccountCreatedPage(page);

        await expect(accountCreatedPage.accountCreatedText).toHaveText('Account Created!');
    })
 
    test('Successfully register a user with optional fields', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.startNewUserSignup()
        
        const registrationPage = new RegistrationPage(page);

        await registrationPage.createNewUser(true);

        const accountCreatedPage = new AccountCreatedPage(page);

        await expect(accountCreatedPage.accountCreatedText).toHaveText('Account Created!');
    })
})