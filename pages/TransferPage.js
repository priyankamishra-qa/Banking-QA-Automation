
const { expect } = require('@playwright/test');

class TransferPage {
    constructor(page) {
        this.page = page;

        this.transferFundsLink = page.locator('#leftPanel').getByRole(
            'link',
            { name: 'Transfer Funds' }
        );

        this.amountInput = page.locator('#amount');
        this.fromAccount = page.locator('#fromAccountId');
        this.toAccount = page.locator('#toAccountId');

        this.transferButton = page.locator(
            '#transferForm input[type="submit"]'
        );

        this.transferCompleteMessage = page.getByRole('heading', {
            name: 'Transfer Complete!'
        });
    }

    // Open the Transfer Funds page.
    async openTransferPage() {
        await this.transferFundsLink.click();
    }

    // Wait for the account dropdowns to populate and select two accounts.
    async selectAccounts() {
        await this.fromAccount.waitFor({ state: 'visible' });
        await this.toAccount.waitFor({ state: 'visible' });

        await this.page.waitForFunction(() => {
            const fromOptions = document.querySelectorAll(
                '#fromAccountId option'
            );
            const toOptions = document.querySelectorAll(
                '#toAccountId option'
            );

            return fromOptions.length >= 1 && toOptions.length >= 2;
        }, { timeout: 10000 });

        const sourceOptions = await this.fromAccount
            .locator('option')
            .allTextContents();

        const destinationOptions = await this.toAccount
            .locator('option')
            .allTextContents();

        console.log('Source accounts:', sourceOptions);
        console.log('Destination accounts:', destinationOptions);

        if (sourceOptions.length < 1 || destinationOptions.length < 2) {
            throw new Error(
                'Transfer cannot proceed: ParaBank did not load enough accounts.'
            );
        }

        await this.fromAccount.selectOption({ index: 0 });
        await this.toAccount.selectOption({ index: 1 });
    }

    // Enter the transfer amount.
    async enterAmount(amount) {
        await this.amountInput.fill(amount);
    }

    // Submit the transfer form.
    async transfer() {
        await this.transferButton.click();
    }

    // Verify the successful transfer confirmation.
    async verifyTransferComplete() {
        await expect(this.transferCompleteMessage).toBeVisible();

        await expect(this.page.locator('#rightPanel')).toContainText(
            '$10.00 has been transferred from account #12345 to account #12456.'
        );
    }
}

module.exports = { TransferPage };
