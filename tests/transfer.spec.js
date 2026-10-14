const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { TransferPage } = require('../pages/TransferPage');
const users = require('../test-data/users.json');
test('Transfer Funds - successful transfer', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const transferPage = new TransferPage(page);

    await loginPage.open();
    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );
    await transferPage.openTransferPage();
    await transferPage.selectAccounts();
    await transferPage.enterAmount('10');
    await transferPage.transfer();
    await transferPage.verifyTransferComplete();
});