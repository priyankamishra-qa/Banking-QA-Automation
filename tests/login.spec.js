const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Valid login - ParaBank', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('john', 'demo');

    await expect(
    page.getByRole('heading', { name: 'Accounts Overview' })
    ).toBeVisible();
});