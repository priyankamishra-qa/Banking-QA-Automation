class TransferPage {
    constructor(page) {
        this.page = page;

        this.transferFundsLink = page.locator('#leftPanel').getByRole('link', {
            name: 'Transfer Funds'
        });

        this.amountInput = page.locator('#amount');
        this.fromAccount = page.locator('#fromAccountId');
        this.toAccount = page.locator('#toAccountId');

        this.transferButton = page.getByRole('button', {
            name: 'Transfer'
        });

        this.transferCompleteMessage = page.getByRole('heading', {
            name: 'Transfer Complete!'
        });
    }

    async openTransferPage() {
        await this.transferFundsLink.click();
    }

    async enterAmount(amount) {
        await this.amountInput.fill(amount);
    }
    async selectAccounts() {
        await this.fromAccount.selectOption({ index: 0 });
        await this.toAccount.selectOption({ index: 1 });
    }
    async transfer() {
        await this.transferButton.click();
    }

    async verifyTransferComplete() {
    const { expect } = require('@playwright/test');

    await expect(
        this.page.getByText('Transfer Complete!')
    ).toBeVisible();

    await expect(
        this.page.locator('#rightPanel')
    ).toContainText('$10.00 has been transferred from account #12345 to account #12456.');
    }
}

module.exports = { TransferPage };