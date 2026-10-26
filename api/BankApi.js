
class BankApi {
    constructor(request) {
        this.request = request;
        this.baseUrl = 'https://parabank.parasoft.com/parabank';
    }

    // API: Login with username and password
    async login(username, password) {
        return await this.request.get(
            `${this.baseUrl}/services/bank/login/${encodeURIComponent(username)}/${encodeURIComponent(password)}`,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );
    }

    // API: Retrieve accounts for a customer
    async getCustomerAccounts(customerId) {
        return await this.request.get(
            `${this.baseUrl}/services/bank/customers/${customerId}/accounts`,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );
    }

    // API: Retrieve transactions for an account
    async getAccountTransactions(accountId) {
        return await this.request.get(
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
