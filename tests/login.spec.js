const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const errorMessage = 'The username and password could not be verified.';

async function expectLoginError(page, username, password) {
    const loginPage = new LoginPage(page);

    await loginPage.open();

    await page.locator('input[name="username"]').fill(username);
    await page.locator('input[name="password"]').fill(password);

    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.getByText(errorMessage)).toBeVisible();
}

test('Valid login - ParaBank', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('john', 'demo');

    await expect(
        page.getByRole('heading', { name: 'Accounts Overview' })
    ).toBeVisible();
});

test('Negative login - Invalid username and password', async ({ page }) => {
    await expectLoginError(page, 'wronguser', 'wrongpass');
});

test('Negative login - Invalid username and valid password', async ({ page }) => {
    await expectLoginError(page, 'wronguser', 'demo');
});

test('Negative login - Valid username and invalid password', async ({ page }) => {
    await expectLoginError(page, 'john', 'wrongpass');
});

test('Negative login - Empty username and password', async ({ page }) => {
const loginPage = new LoginPage(page);

await loginPage.open();

await page.locator('input[name="username"]').fill('');
await page.locator('input[name="password"]').fill('');

await page.getByRole('button', { name: 'Log In' }).click();

await expect(
    page.getByText('Please enter a username and password.')
).toBeVisible();

});

test('Verify login error message text', async ({ page }) => {
    await expectLoginError(page, 'invaliduser', 'invalidpass');

    await expect(
        page.getByText(errorMessage)
    ).toHaveText(errorMessage);
});