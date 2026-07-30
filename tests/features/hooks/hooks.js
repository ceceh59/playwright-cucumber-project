const { Before, After, Status } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

Before({ timeout: 30000 }, async function () {
    console.log("BEFORE HOOK EXECUTED");

    this.browser = await chromium.launch({
        headless: false
    });

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    console.log("PAGE CREATED");
});

After(async function ({ result }) {

    if (result?.status === Status.FAILED && this.page) {
        await this.page.screenshot({
            path: `error-${Date.now()}.png`,
            fullPage: true
        });
    }

    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});