const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { TransferPage } = require('../pages/TransferPage');
const users = require('../test-data/users.json');

// Log HTTP and network failures to help diagnose test issues.
test.beforeEach(async ({ page }) => {
    page.on('response', (response) => {
        if (response.status() >= 400) {
            console.log(
                'FAILED RESPONSE:',
                response.status(),
                response.url()
            );
        }
    });

    page.on('requestfailed', (request) => {
        console.log(
            'FAILED REQUEST:',
            request.url(),
            request.failure()?.errorText
        );
    });
});

// Helper: log in and open the transfer form.
async function openTransferForm(page) {
    const loginPage = new LoginPage(page);
    const transferPage = new TransferPage(page);

    await loginPage.open();
    await loginPage.login(
        users.validUser.username,
        users.validUser.password
    );

    await transferPage.openTransferPage();
    await transferPage.selectAccounts();

    return transferPage;
}

test('Transfer Funds - successful transfer', async ({ page }) => {
    const transferPage = await openTransferForm(page);

    // Submit a transfer of $10.
    await transferPage.enterAmount('10');
    await transferPage.transfer();

    // Verify the successful transfer confirmation.
    await transferPage.verifyTransferComplete();
});

test('Negative transfer - Empty amount', async ({ page }) => {
    const transferPage = await openTransferForm(page);

    // Submit the form without entering an amount.
    await transferPage.enterAmount('');
    await transferPage.transfer();

    await expect(
        page.getByRole('heading', { name: 'Transfer Funds' })
    ).toBeVisible();

    await expect(
        transferPage.transferCompleteMessage
    ).not.toBeVisible();

    await expect(transferPage.amountInput).toHaveValue('');
});

test('Negative transfer - Zero amount', async ({ page }) => {
    const transferPage = await openTransferForm(page);

    await transferPage.enterAmount('0');
    await transferPage.transfer();

    await expect(
        page.getByRole('heading', { name: 'Transfer Funds' })
    ).toBeVisible();

    await expect(
        transferPage.transferCompleteMessage
    ).not.toBeVisible();
});

test('Negative transfer - Negative amount', async ({ page }) => {
    const transferPage = await openTransferForm(page);

    await transferPage.enterAmount('-10');
    await transferPage.transfer();

    await expect(
        page.getByRole('heading', { name: 'Transfer Funds' })
    ).toBeVisible();

    await expect(
        transferPage.transferCompleteMessage
    ).not.toBeVisible();
});

test('Negative transfer - Invalid text amount', async ({ page }) => {
    const transferPage = await openTransferForm(page);

    await transferPage.enterAmount('abc');

    // Verify that the input accepts the text before submitting.
    await expect(transferPage.amountInput).toHaveValue('abc');

    await transferPage.transfer();

    await expect(
        page.getByRole('heading', { name: 'Transfer Funds' })
    ).toBeVisible();

    await expect(
        transferPage.transferCompleteMessage
    ).not.toBeVisible();
});
