
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

    
    // Wait for valid account options and select two accounts.
    async selectAccounts() {
        await this.fromAccount.waitFor({ state: 'visible' });
        await this.toAccount.waitFor({ state: 'visible' });

        // Wait up to 30 seconds for real account options to load.
        await this.page.waitForFunction(() => {
            const fromSelect = document.querySelector('#fromAccountId');
            const toSelect = document.querySelector('#toAccountId');

            if (!fromSelect || !toSelect) {
                return false;
            }

            const validAccounts = (select) =>
                Array.from(select.options).filter(
                    option =>
                        option.value &&
                        /^\d+$/.test(option.value.trim())
                );

            return (
                validAccounts(fromSelect).length >= 1 &&
                validAccounts(toSelect).length >= 2
            );
        }, { timeout: 30000 });

        const sourceOptions = await this.fromAccount
            .locator('option')
            .evaluateAll(options =>
                options.map(option => ({
                    value: option.value,
                    text: option.textContent.trim()
                }))
            );

        const destinationOptions = await this.toAccount
            .locator('option')
            .evaluateAll(options =>
                options.map(option => ({
                    value: option.value,
                    text: option.textContent.trim()
                }))
            );

        console.log('Source account options:', sourceOptions);
        console.log('Destination account options:', destinationOptions);

        const validSource = sourceOptions.filter(
            option => /^\d+$/.test(option.value.trim())
        );

        const validDestination = destinationOptions.filter(
            option => /^\d+$/.test(option.value.trim())
        );

        if (validSource.length < 1 || validDestination.length < 2) {
            throw new Error(
                `Insufficient account options. Source: ${JSON.stringify(sourceOptions)}; Destination: ${JSON.stringify(destinationOptions)}`
            );
        }

        await this.fromAccount.selectOption(validSource[0].value);

        // Prefer a destination different from the source account.
        const destination = validDestination.find(
            option => option.value !== validSource[0].value
        );

        if (!destination) {
            throw new Error(
                'No destination account different from the source account was available.'
            );
        }

        await this.toAccount.selectOption(destination.value);
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
