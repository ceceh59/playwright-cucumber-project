const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given('I navigate to {string}', async function (url) {
    await this.page.goto(url);
});

When('I enter my email {string}', async function (email) {

    const emailField = this.page.getByTestId("login-email");

    await emailField.clear();

    if (email) {
        await emailField.fill(email);
    }
});

When('I enter my password {string}', async function (password) {

    const passwordField = this.page.getByTestId("login-password");

    await passwordField.clear();

    if (password) {
        await passwordField.fill(password);
    }
});

When('I click on the button login', async function () {
    await this.page.getByTestId("login-submit").click();
   
});

Then('I should see {string}', async function (message) {

    await this.page.waitForLoadState('networkidle');

    await expect(
        this.page.getByText(message, { exact: false })
    ).toBeVisible({ timeout: 15000 });

});
Then('I should see error message {string}', async function (expectedMessages) {

    const expectedMessagesArray = expectedMessages
        .split(',')
        .map(msg => msg.trim());

    await this.page.waitForLoadState('networkidle');

    for (const expectedMessage of expectedMessagesArray) {

        await expect(
            this.page.getByText(expectedMessage, { exact: false })
        ).toBeVisible({ timeout: 15000 });

    }
});