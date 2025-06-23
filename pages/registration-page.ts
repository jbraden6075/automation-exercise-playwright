// pages/home-page.ts
import { Page, Locator } from '@playwright/test';
import { randomAlphabeticString, randomNumericString, randomStateInput } from '../helpers/global-functions';


export interface RegistrationValues {
    name?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    country?: string;
    state?: string;
    city?: string;
    zipCode?: number;
    mobileNumber?: number;
}

export class RegistrationPage {
    // Define locators for elements on the home page
    private readonly titleMrRadio: Locator;
    private readonly titleMrsRadio: Locator;
    private readonly nameInput: Locator; // Public to be accessed from the LoginPage class
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly dateOfBirthDaySelect: Locator;
    private readonly dateOfBirthMonthSelect: Locator;
    private readonly dateOfBirthYearSelect: Locator;
    private readonly newsletterCheckbox: Locator;
    private readonly specialOffersCheckbox: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly companyInput: Locator;
    private readonly addressInput: Locator;
    private readonly address2Input: Locator;
    private readonly countrySelect: Locator;
    private readonly stateInput: Locator;
    private readonly cityInput: Locator;
    private readonly zipCodeInput: Locator;
    private readonly mobileNumberInput: Locator;
    private readonly createAccountButton: Locator;
    

    // Constructor to initialize the HomePage with a Playwright Page instance
    constructor(private readonly page: Page) {
        this.titleMrRadio = page.locator('input[id="id_gender1"]');
        this.titleMrsRadio = page.locator('input[id="id_gender2"]');
        this.nameInput = page.locator('input[data-qa="name"]');
        this.passwordInput = page.locator('input[data-qa="password"]');
        this.dateOfBirthDaySelect = page.locator('select[data-qa="days"]');
        this.dateOfBirthMonthSelect = page.locator('select[data-qa="months"]');
        this.dateOfBirthYearSelect = page.locator('select[data-qa="years"]');
        this.newsletterCheckbox = page.locator('input[id="newsletter"]');
        this.specialOffersCheckbox = page.locator('input[id="optin"]');
        this.firstNameInput = page.locator('input[data-qa="first_name"]');
        this.lastNameInput = page.locator('input[data-qa="last_name"]');
        this.companyInput = page.locator('input[data-qa="company"]');
        this.addressInput = page.locator('input[data-qa="address"]');
        this.address2Input = page.locator('input[data-qa="address2"]');
        this.countrySelect = page.locator('select[data-qa="country"]');
        this.stateInput = page.locator('input[data-qa="state"]');
        this.cityInput = page.locator('input[data-qa="city"]');
        this.zipCodeInput = page.locator('input[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
        this.createAccountButton = page.locator('button[data-qa="create-account"]');
    }

    async createNewUser(optionalFields?: boolean,
        password: RegistrationValues['password'] = 'playwrightautomation',
        firstName: RegistrationValues['firstName'] = `${randomAlphabeticString(8)}`,
        lastName: RegistrationValues['lastName'] = `${randomAlphabeticString(8)}`,
        address: RegistrationValues['address'] = `${randomNumericString(3)}` + ' ' + `${randomAlphabeticString(6)}` + ' ' + 'Street',
        state: RegistrationValues['state'] = `${randomStateInput()}`
            ): Promise<void> {

                if(optionalFields) {
                    const coin = Math.floor(Math.random() * 2) + 1;

                    if (coin === 1) {
                        await this.titleMrRadio.check();
                    }else {
                        await this.titleMrsRadio.check();
                    }

                    await this.dateOfBirthDaySelect.selectOption({ index: Math.floor(Math.random() * 28 + 1)});
                    await this.dateOfBirthMonthSelect.selectOption({ index: Math.floor(Math.random() * 11 + 1 )});
                    await this.dateOfBirthYearSelect.selectOption({ index: Math.floor(Math.random() * 120 + 1) });
                    await this.newsletterCheckbox.check();
                    await this.specialOffersCheckbox.check();
                    await this.companyInput.fill(`${randomAlphabeticString(20)}`);
                    await this.address2Input.fill(`${randomAlphabeticString(3)}` + `${randomNumericString(3)}`);
                }

                await this.nameInput.fill(`${firstName} ${lastName}`);
                await this.passwordInput.fill(password);
                await this.firstNameInput.fill(firstName);
                await this.lastNameInput.fill(lastName);
                await this.addressInput.fill(address);
                await this.countrySelect.selectOption({ label: 'United States' });
                await this.stateInput.fill(state);
                await this.cityInput.fill('Cityville');
                await this.zipCodeInput.fill(`${randomNumericString(5)}`);
                await this.mobileNumberInput.fill(`${randomNumericString(10)}`);
                await this.createAccountButton.click();

                await this.page.waitForURL('https://automationexercise.com/account_created');
    }
}