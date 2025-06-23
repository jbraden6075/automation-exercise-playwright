import { Page, Locator } from '@playwright/test';


export class AccountCreatedPage {
    public readonly accountCreatedText: Locator;

    constructor(private readonly page: Page) {
        this.accountCreatedText = page.locator('h2[data-qa="account-created"]');
    }
}



