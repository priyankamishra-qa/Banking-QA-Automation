
class BankApi {
    constructor(request) {
        this.request = request;
        this.baseUrl = 'https://parabank.parasoft.com/parabank';
    }

    // Validate IDs before making API requests.
    validateId(id, name) {
        if (!/^\d+$/.test(String(id)) || Number(id) <= 0) {
            throw new Error(`${name} must be a positive numeric ID.`);
        }
    }

    // API: Login with username and password.
    async login(username, password) {
        if (!username || !password) {
            throw new Error('Username and password are required.');
        }

        return this.request.get(
            `${this.baseUrl}/services/bank/login/${encodeURIComponent(username)}/${encodeURIComponent(password)}`,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );
    }

    // API: Retrieve accounts for a customer.
    async getCustomerAccounts(customerId) {
        this.validateId(customerId, 'Customer ID');

        return this.request.get(
            `${this.baseUrl}/services/bank/customers/${customerId}/accounts`,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );
    }

    // API: Retrieve transactions for an account.
    async getAccountTransactions(accountId) {
        this.validateId(accountId, 'Account ID');

        return this.request.get(
            `${this.baseUrl}/services/bank/accounts/${accountId}/transactions`,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );
    }
}

module.exports = { BankApi };
