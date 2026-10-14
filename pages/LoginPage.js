class LoginPage {
    constructor(page) {
        this.page = page;

        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Log In' });
    }

    async open() {
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        await this.page.waitForLoadState('domcontentloaded');

        console.log('Current URL:', this.page.url());
    }
}

module.exports = { LoginPage };