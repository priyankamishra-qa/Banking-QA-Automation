const { test, expect } = require('@playwright/test');
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

test('Negative transfer - Empty amount', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const transferPage = new TransferPage(page);

    await loginPage.open();
    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await transferPage.openTransferPage();
    console.log(
    'Amount field type:',
    await transferPage.amountInput.getAttribute('type')
    );

    await transferPage.selectAccounts();

    // Leave the transfer amount empty
    await transferPage.enterAmount('');

    // Submit the transfer
    await transferPage.transfer();

    // Verify that the transfer form remains visible
    await expect(
        page.getByRole('heading', { name: 'Transfer Funds' })
    ).toBeVisible();

    // Verify that no transfer confirmation appears
    await expect(
        transferPage.transferCompleteMessage
    ).not.toBeVisible();

    // Verify that the amount field is still empty
    await expect(
        transferPage.amountInput
    ).toHaveValue('');
});


test('Negative transfer - Zero amount', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const transferPage = new TransferPage(page);

    await loginPage.open();
    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await transferPage.openTransferPage();
    await transferPage.selectAccounts();

    // Enter zero as the transfer amount
    await transferPage.enterAmount('0');

    await transferPage.transfer();

    // Verify that the transfer form remains visible
    await expect(
        page.getByRole('heading', { name: 'Transfer Funds' })
    ).toBeVisible();

    // Verify that no successful transfer confirmation appears
    await expect(
        transferPage.transferCompleteMessage
    ).not.toBeVisible();
});


test('Negative transfer - Negative amount', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const transferPage = new TransferPage(page);

    await loginPage.open();
    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await transferPage.openTransferPage();
    await transferPage.selectAccounts();

    // Enter a negative transfer amount
    await transferPage.enterAmount('-10');

    await transferPage.transfer();

    // Verify the transfer form remains visible
    await expect(
        page.getByRole('heading', { name: 'Transfer Funds' })
    ).toBeVisible();

    // Verify that no successful transfer confirmation appears
    await expect(
        transferPage.transferCompleteMessage
    ).not.toBeVisible();
});


test('Negative transfer - Invalid text amount', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const transferPage = new TransferPage(page);

    await loginPage.open();
    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await transferPage.openTransferPage();
    await transferPage.selectAccounts();

    // Enter non-numeric text
    await transferPage.enterAmount('abc');

    // Confirm the field accepts the entered text
    await expect(transferPage.amountInput).toHaveValue('abc');

    await transferPage.transfer();

    // The transfer form should remain visible
    await expect(
        page.getByRole('heading', { name: 'Transfer Funds' })
    ).toBeVisible();

    // The application should not show transfer completion
    await expect(
        transferPage.transferCompleteMessage
    ).not.toBeVisible();
});
