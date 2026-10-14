class AccountsPage {
    constructor(page) {
        this.page = page;

        this.accountsOverviewHeading = page.getByRole('heading', {
            name: 'Accounts Overview'
        });

        this.accountColumn = page.getByRole('columnheader', {
            name: 'Account'
        });
    }

    async verifyAccountsOverviewDisplayed() {
        await this.accountsOverviewHeading.waitFor();
    }

    async verifyAccountColumnDisplayed() {
        await this.accountColumn.waitFor();
    }
}

module.exports = { AccountsPage };