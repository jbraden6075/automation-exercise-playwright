// Import necessary modules from Playwright
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page.ts';
import { HomePage } from '../pages/home-page.ts';

// Define the test suite for login functionality
test.beforeEach(async ( { page }) => {
    // Navigate to the login page before each test
    await page.goto('https://automationexercise.com/login');
});

// Define the test cases for login functionality
test.describe('Login', () => {
    // Test case for successful login with valid credentials
    test('Login is successful with valid credentials', async ({ page }) => {
        // Create an instance of the LoginPage class
        const loginPage = new LoginPage(page);

        // Call the loginValid method to perform the login action
        await loginPage.loginValid();

        // Create an instance of the HomePage class
        const homePage = new HomePage(page);

        // Assert that the logged-in user's name is visible and matches the expected value
        await expect(homePage.loggedInUser).toHaveText("Playwright Automation");
    });

    // Test case for login failure with invalid credentials - password
    test('Login fails with invalid credentials - password', async ({ page }) => {
        // Create an instance of the LoginPage class
        const loginPage = new LoginPage(page);

        // Call the loginInvalidPassword method to perform the login action with invalid credentials
        await loginPage.loginInvalidPassword();

        // Locate the error message displayed after failed login
        const loginErrorMessage = page.getByText('Your email or password is incorrect!');
        
        // Assert that the error message is visible
        await expect(loginErrorMessage).toBeVisible();
    })

    // Test case for login failure with invalid credentials - email
    test('Login fails with invalid credentials - email', async ({ page }) => {
        // Create an instance of the LoginPage class
        const loginPage = new LoginPage(page);

        // Call the loginInvalidPassword method to perform the login action with invalid credentials
        await loginPage.loginInvalidEmail();

        // Locate the error message displayed after failed login
        const loginErrorMessage = page.getByText('Your email or password is incorrect!');
        
        // Assert that the error message is visible
        await expect(loginErrorMessage).toBeVisible();
    })

    // Test case for successful logout
    test('Logout is successful', async ({ page }) => {
        // Create an instance of the HomePage class
        const loginPage = new LoginPage(page);

        // Call the loginValid method to perform the login action
        await loginPage.loginValid();

        // Create an instance of the HomePage class
        const homePage = new HomePage(page);

        // Call the logout method to log out the user
        await homePage.logout();

        // Assert the login page is visible after logout
        await expect(page).toHaveURL('https://automationexercise.com/login');
    })
});