// pages/home-page.ts
import { Page, Locator } from '@playwright/test';


// Define the HomePage class to represent the home page of the application
export class HomePage {
    // Define locators for elements on the home page
    public readonly loggedInUser: Locator; // Public to be accessed from the LoginPage class
    private readonly logoutButton: Locator;
    private readonly signupLoginLink: Locator;

    // Constructor to initialize the HomePage with a Playwright Page instance
    constructor(private readonly page: Page) {
        this.loggedInUser = page.locator('ul > li > a > b');
        this.logoutButton = page.locator('a[href="/logout"]');
        this.signupLoginLink = page.locator('a[href="/login"]');
    }

    // Log the user out of the website
    async logout(): Promise<void> {
        // Click the logout button
        await this.logoutButton.click();
        
        // Wait for the URL to change to the login page after logout
        await this.page.waitForURL('https://automationexercise.com/login');
    } 

    async clickSignupLoginLink(): Promise<void> {
        // Click the Signup / Login link 
        await this.signupLoginLink.click();

        await this.page.waitForURL('https://automationexercise.com/login')
    }
}