const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { AccountsPage } = require('../pages/AccountsPage');
const users = require('../test-data/users.json');
test('Verify Accounts Overview after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountsPage = new AccountsPage(page);
    await loginPage.open();
    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );
    await accountsPage.verifyAccountsOverviewDisplayed();
    await accountsPage.verifyAccountColumnDisplayed();
});